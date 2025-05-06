import invariant from 'tiny-invariant';

import type { UpdateUserPayload, User } from '@repo/dto/user';

import {
  findUser,
  findManyUsers,
  updateManyUsers,
  setRecentlyActiveToNow,
  updateUser,
} from '@/repository/user-collection.js';
import type { AuthorizedRequestHandler } from '@/types/handler.js';
import type { SuccessResponse } from '@/utils/response.js';
import { ErrorResponse, successResponse } from '@/utils/response.js';

export const getUsers: AuthorizedRequestHandler<
  unknown,
  SuccessResponse<Array<User & { id: string }>>,
  unknown,
  { page?: number }
> = async (req, res) => {
  const page = Number.parseInt(`${req.query.page ?? 1}`);
  const users = await findManyUsers({ page });
  res.json(successResponse(users));
};

export const updateUsers: AuthorizedRequestHandler<
  unknown,
  unknown,
  { data: Array<{ id: string } & Partial<User>> }
> = async (req, res) => {
  invariant(
    req.body?.data,
    '`data` is required with type array of updated users',
  );
  invariant(
    req.body.data.every((item) => !!item.id),
    '`id` field is required in each item of the `data` array',
  );
  const users = req.body.data;
  await updateManyUsers(users);
  await setRecentlyActiveToNow(res.locals.userId);
  res.status(200).json(successResponse({ success: true }));
};

export const getCurrentUser: AuthorizedRequestHandler = async (_req, res) => {
  const { userId } = res.locals;
  const user = await findUser(userId);
  if (!user) {
    throw new ErrorResponse(`User ID '${userId}' is not found`, 404);
  }
  res.json(successResponse(user));
};

export const updateCurrentUser: AuthorizedRequestHandler<
  unknown,
  unknown,
  UpdateUserPayload
> = async (req, res) => {
  const { userId } = res.locals;
  invariant(req.body, 'Request body is required');
  const updatedUser: UpdateUserPayload = {
    email: req.body.email,
    name: req.body.name,
  };
  await updateUser(userId, updatedUser);
  res.status(200).json(successResponse({ success: true }));
};
