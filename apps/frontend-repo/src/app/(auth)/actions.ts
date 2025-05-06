'use server';

import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { redirect, RedirectType } from 'next/navigation';

import { registerCurrentUser, signInCurrentUser } from '@/api/auth';
import { setAuthTokenCookie } from '@/lib/auth-token-cookie';
import { firebaseApp } from '@/lib/firebase';

type Payload<Fields extends readonly string[]> = Partial<
  Record<Fields[number], string>
>;

interface FormState<T> {
  error: string | null;
  payload: T | null;
}

function parseFormData<K extends string>(
  formData: FormData,
  fields: readonly K[],
): Payload<typeof fields> {
  const payload: Partial<Record<K, string>> = {};
  for (const field of fields) {
    const value = formData.get(field);
    if (typeof value === 'string') {
      payload[field] = value;
    }
  }
  return payload;
}

const LOGIN_FIELDS = ['email', 'password'] as const;
const REGISTER_FIELDS = ['email', 'password', 'name'] as const;

const auth = getAuth(firebaseApp);

type LoginPayload = Payload<typeof LOGIN_FIELDS>;

export async function login(
  _prevState: FormState<LoginPayload>,
  formData: FormData,
): Promise<FormState<LoginPayload>> {
  const payload = parseFormData(formData, LOGIN_FIELDS);

  if (!payload.email || !payload.password) {
    return { error: 'Email and Password are required', payload };
  }

  try {
    const credential = await signInWithEmailAndPassword(
      auth,
      payload.email,
      payload.password,
    );
    const token = await credential.user.getIdToken();
    await setAuthTokenCookie(token);
    await signInCurrentUser();
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
      payload,
    };
  }

  redirect('/', RedirectType.push);
}

type RegisterPayload = Payload<typeof REGISTER_FIELDS>;

export async function register(
  _prevState: FormState<RegisterPayload>,
  formData: FormData,
): Promise<FormState<RegisterPayload>> {
  const payload = parseFormData(formData, REGISTER_FIELDS);

  if (!payload.name || !payload.email || !payload.password) {
    return { error: 'Name, Email and Password are required', payload };
  }

  try {
    const credential = await createUserWithEmailAndPassword(
      auth,
      payload.email,
      payload.password,
    );
    const token = await credential.user.getIdToken();
    await setAuthTokenCookie(token);
    await registerCurrentUser({
      email: payload.email,
      name: payload.name,
    });
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
      payload,
    };
  }

  redirect('/', RedirectType.push);
}
