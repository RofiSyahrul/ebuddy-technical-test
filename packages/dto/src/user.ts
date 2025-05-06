import type { Timestamp } from '@google-cloud/firestore';

export interface User {
  email: string;
  name: string;
  recentlyActive: Timestamp;
}

export type CreateUserPayload = Pick<User, 'email' | 'name'>;
export type UpdateUserPayload = Partial<Omit<User, 'email' | 'recentlyActive'>>;

export interface UserResponseItem extends Omit<User, 'recentlyActive'> {
  id: string;
  lastActive: string;
}

export interface UpdateUserPayloadWithId extends UpdateUserPayload {
  id: string;
}
