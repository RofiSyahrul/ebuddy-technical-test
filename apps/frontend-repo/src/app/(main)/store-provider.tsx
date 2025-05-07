'use client';

import { useRef, type PropsWithChildren } from 'react';

import { Provider } from 'react-redux';

import type { UserResponseItem } from '@repo/dto/user';

import type { AppStore } from '@/store/store';
import { makeStore } from '@/store/store';

export default function StoreProvider({
  children,
  currentUser,
  users,
}: PropsWithChildren<{
  currentUser: UserResponseItem;
  users: UserResponseItem[];
}>) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore({
      users: {
        current: currentUser,
        dataMap: Object.fromEntries(users.map((user) => [user.id, user])),
        updated: { current: null, dataMap: {} },
      },
    });
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
