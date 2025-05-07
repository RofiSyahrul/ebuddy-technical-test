'use server';

import type { UpdateUserPayloadWithId } from '@repo/dto/user';

import { updateCurrentUser, updateUsers } from '@/api/user';
import type { UsersSliceState } from '@/store/users/users-slice';

export async function saveChanges({
  current,
  dataMap,
}: UsersSliceState['updated']) {
  const promises: Promise<unknown>[] = [];

  if (current) {
    promises.push(updateCurrentUser(current));
  }

  const updatedUsers = Object.entries(dataMap).map<UpdateUserPayloadWithId>(
    ([id, item]) => ({ id, ...item }),
  );

  if (updatedUsers.length > 0) {
    promises.push(updateUsers(updatedUsers));
  }

  await Promise.all(promises);
}
