import type { PropsWithChildren } from 'react';

import { redirect, RedirectType } from 'next/navigation';

import type { UserResponseItem } from '@repo/dto/user';

import { getCurrentUser, getUsers } from '@/api/user';

import Header from './components/header';
import StoreProvider from './store-provider';

const safeFetchAllData = async (): Promise<
  [UserResponseItem | null, UserResponseItem[]]
> => {
  try {
    const [currentUser, users] = await Promise.all([
      getCurrentUser(),
      getUsers({ page: 1 }),
    ]);
    return [currentUser, users];
  } catch {
    return [null, []];
  }
};

export default async function Layout({ children }: PropsWithChildren) {
  const [currentUser, users] = await safeFetchAllData();

  if (!currentUser) {
    redirect('/login', RedirectType.replace);
  }

  return (
    <StoreProvider currentUser={currentUser} users={users}>
      <Header />
      <main>{children}</main>
    </StoreProvider>
  );
}
