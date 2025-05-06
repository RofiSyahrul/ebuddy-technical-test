'use client';

import TBody from '@mui/material/TableBody';

import type { UserResponseItem } from '@repo/dto/user';

import { useAppSelector } from '@/store/hooks';
import {
  selectCurrentUserId,
  selectCurrentUserName,
  selectUpdatedUser,
  selectUsers,
} from '@/store/users/users-slice';

import Row from './components/row';

function CurrentUserRow({ data }: { data: UserResponseItem }) {
  const currentUserName = useAppSelector(selectCurrentUserName);
  return <Row data={{ ...data, name: currentUserName }} />;
}

function OtherRow({ data }: { data: UserResponseItem }) {
  const updatedUser = useAppSelector((state) => {
    return selectUpdatedUser(state, data.id);
  });
  return <Row data={{ ...data, ...updatedUser }} />;
}

export default function TableBody() {
  const users = useAppSelector(selectUsers);
  const currentUserId = useAppSelector(selectCurrentUserId);

  return (
    <TBody>
      {users.map((user) => {
        if (user.id === currentUserId) {
          return <CurrentUserRow key={user.id} data={user} />;
        }
        return <OtherRow key={user.id} data={user} />;
      })}
    </TBody>
  );
}
