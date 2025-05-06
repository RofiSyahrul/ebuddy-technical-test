import { Timestamp, type CollectionReference } from 'firebase-admin/firestore';

import type {
  CreateUserPayload,
  UpdateUserPayload,
  UpdateUserPayloadWithId,
  User,
  UserResponseItem,
} from '@repo/dto/user';

import { db } from '@/config/firebase-config.js';

const userCollection = db.collection('users') as CollectionReference<
  User,
  User
>;

const LIMIT = 10;

export const findManyUsers = async ({ page }: { page: number }) => {
  const snapshot = await userCollection
    .orderBy('recentlyActive', 'desc')
    .limit(LIMIT)
    .offset((page - 1) * LIMIT)
    .get();

  if (snapshot.empty) return [];

  return snapshot.docs.map<UserResponseItem>((doc) => {
    const { recentlyActive, ...item } = doc.data();
    const lastActive = recentlyActive.toDate().toISOString();
    return {
      id: doc.id,
      lastActive,
      ...item,
    };
  });
};

export const updateManyUsers = async (users: UpdateUserPayloadWithId[]) => {
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

export const findUser = async (
  id: string,
): Promise<UserResponseItem | null> => {
  const user = await userCollection.doc(id).get();
  const data = user.data();
  if (!data) {
    return null;
  }
  const { recentlyActive, ...detail } = data;
  return { id, lastActive: recentlyActive.toDate().toISOString(), ...detail };
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
