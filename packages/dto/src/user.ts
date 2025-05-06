import type { Timestamp } from '@google-cloud/firestore';

export interface User {
  email: string;
  name: string;
  recentlyActive: Timestamp;
}

export type CreateUserPayload = Pick<User, 'email' | 'name'>;
export type UpdateUserPayload = Partial<Omit<User, 'recentlyActive'>>;
