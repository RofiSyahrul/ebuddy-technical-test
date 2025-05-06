'use server';

import type {
  UpdateUserPayload,
  UpdateUserPayloadWithId,
  UserResponseItem,
} from '@repo/dto/user';

import type { Query } from './_base';
import { fetcher } from './_base';

type GetUsersQuery = {
  page: number;
};

const BASE_PATH = '/api/users';

export const getUsers = async (query: GetUsersQuery) => {
  const response = await fetcher<{ data: UserResponseItem[] }, GetUsersQuery>(
    BASE_PATH,
    { query },
  );
  return response.data;
};

export const updateUsers = async (users: UpdateUserPayloadWithId[]) => {
  await fetcher<unknown, Query, { data: UpdateUserPayloadWithId[] }>(
    BASE_PATH,
    {
      body: { data: users },
    },
  );
};

export const getCurrentUser = async () => {
  const response = await fetcher<{ data: UserResponseItem }>(
    BASE_PATH + '/current',
  );
  return response.data;
};

export const updateCurrentUser = async (payload: UpdateUserPayload) => {
  await fetcher<unknown, Query, UpdateUserPayload>(BASE_PATH + '/current', {
    body: payload,
  });
};
