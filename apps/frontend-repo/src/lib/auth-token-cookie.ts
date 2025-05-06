import { cookies } from 'next/headers';

const KEY = 'pbbxvr-xrl';

export const getAuthTokenCookie = async () => {
  const cookieStore = await cookies();
  return cookieStore.get(KEY)?.value;
};

export const setAuthTokenCookie = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set(KEY, token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
    sameSite: 'lax',
  });
};
