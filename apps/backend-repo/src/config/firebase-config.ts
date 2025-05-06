import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { initializeFirestore } from 'firebase-admin/firestore';

export const firebaseApp = initializeApp({
  credential: applicationDefault(),
});

export const db = initializeFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
