import invariant from 'tiny-invariant';

import type { CreateUserPayload } from '@repo/dto/user';

import {
  createUser,
  setRecentlyActiveToNow,
} from '@/repository/user-collection.js';
import type { AuthorizedRequestHandler } from '@/types/handler.js';
import { successResponse } from '@/utils/response.js';

export const register: AuthorizedRequestHandler<
  unknown,
  { data: { success: boolean } },
  CreateUserPayload
> = async (req, res) => {
  const user = req.body;
  invariant(user?.email, 'Email is required');
  invariant(user?.name, 'Name is required');
  await createUser(res.locals.userId, user);
  res.status(201).json(successResponse({ success: true }));
};

export const signIn: AuthorizedRequestHandler = async (_req, res) => {
  await setRecentlyActiveToNow(res.locals.userId);
  res.status(200).json(successResponse({ success: true }));
};
