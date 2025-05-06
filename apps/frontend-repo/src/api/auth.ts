import type { CreateUserPayload } from '@repo/dto/user';

import { fetcher } from './_base';

export async function registerCurrentUser(userInfo: CreateUserPayload) {
  await fetcher('/api/auth/register', { body: userInfo, method: 'POST' });
}

export async function signInCurrentUser() {
  await fetcher('/api/auth/sign-in', { method: 'POST' });
}
