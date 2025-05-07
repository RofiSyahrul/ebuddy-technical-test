'use client';

import TBody from '@mui/material/TableBody';

import type { UserResponseItem } from '@repo/dto/user';

import { useAppSelector } from '@/store/hooks';
import {
  selectCurrentUserId,
  selectCurrentUserName,
  selectUpdatedUser,
  selectUsersMap,
} from '@/store/users/users-slice';

import Row from './components/row';

function CurrentUserRow({ data }: { data: UserResponseItem }) {
  const hasChanged = useAppSelector((state) => !!state.users.updated.current);
  const currentUserName = useAppSelector(selectCurrentUserName);
  return (
    <Row data={{ ...data, name: currentUserName }} hasChanged={hasChanged} />
  );
}

function OtherRow({ data }: { data: UserResponseItem }) {
  const updatedUser = useAppSelector((state) => {
    return selectUpdatedUser(state, data.id);
  });
  return <Row data={{ ...data, ...updatedUser }} hasChanged={!!updatedUser} />;
}

export default function TableBody() {
  const usersMap = useAppSelector(selectUsersMap);
  const currentUserId = useAppSelector(selectCurrentUserId);

  return (
    <TBody>
      {Object.values(usersMap).map((user) => {
        if (user.id === currentUserId) {
          return <CurrentUserRow key={user.id} data={user} />;
        }
        return <OtherRow key={user.id} data={user} />;
      })}
    </TBody>
  );
}
