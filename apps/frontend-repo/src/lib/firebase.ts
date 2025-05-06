import { initializeApp } from 'firebase/app';

const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const APP_ID = process.env.NEXT_PUBLIC_APP_ID;
const GCLOUD_PROJECT = process.env.NEXT_PUBLIC_GCLOUD_PROJECT;

export const firebaseApp = initializeApp({
  apiKey: API_KEY,
  appId: APP_ID,
  authDomain: `${GCLOUD_PROJECT}.firebaseapp.com`,
  projectId: GCLOUD_PROJECT,
  storageBucket: `${GCLOUD_PROJECT}.firebasestorage.app`,
});
