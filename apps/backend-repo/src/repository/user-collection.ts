import { Timestamp, type CollectionReference } from 'firebase-admin/firestore';

import type {
  CreateUserPayload,
  UpdateUserPayload,
  User,
} from '@repo/dto/user';

import { db } from '@/config/firebase-config.js';

const userCollection = db.collection('users') as CollectionReference<
  User,
  User
>;

const LIMIT = 10;

export const findManyUsers = async ({ page }: { page: number }) => {
  const snapshot = await userCollection
    .limit(LIMIT)
    .offset((page - 1) * LIMIT)
    .get();

  if (snapshot.empty) return [];
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateManyUsers = async (
  users: Array<{ id: string } & Partial<User>>,
) => {
  let batch = db.batch();
  let currentBatchSize = 0;

  for (const user of users) {
    const { id, ...detail } = user;
    const ref = userCollection.doc(id);
    batch.update(ref, detail);
    currentBatchSize++;
    if (currentBatchSize === LIMIT) {
      await batch.commit();
      batch = db.batch();
      currentBatchSize = 0;
    }
  }

  if (currentBatchSize > 0 && currentBatchSize < LIMIT) {
    await batch.commit();
  }
};

export const findUser = async (id: string) => {
  const user = await userCollection.doc(id).get();
  const data = user.data();
  return data;
};

export const createUser = async (id: string, user: CreateUserPayload) => {
  return await userCollection.doc(id).create({
    ...user,
    recentlyActive: Timestamp.fromDate(new Date()),
  });
};

export const updateUser = async (id: string, user: UpdateUserPayload) => {
  return await userCollection.doc(id).update({
    ...user,
    recentlyActive: Timestamp.fromDate(new Date()),
  });
};

export const setRecentlyActiveToNow = async (id: string) => {
  return await updateUser(id, {});
};
