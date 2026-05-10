import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let appInstance: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;
let storageInstance: FirebaseStorage | null = null;

const getFirebaseApp = (): FirebaseApp => {
  if (appInstance) return appInstance;
  if (!firebaseConfig.apiKey) {
    throw new Error(
      "Firebase env variables missing. Set NEXT_PUBLIC_FIREBASE_* in your environment."
    );
  }
  appInstance = getApps().length ? getApp() : initializeApp(firebaseConfig);
  return appInstance;
};

export const getFirebaseAuth = (): Auth => {
  if (!authInstance) authInstance = getAuth(getFirebaseApp());
  return authInstance;
};

export const getDb = (): Firestore => {
  if (!dbInstance) dbInstance = getFirestore(getFirebaseApp());
  return dbInstance;
};

export const getFirebaseStorage = (): FirebaseStorage => {
  if (!storageInstance) storageInstance = getStorage(getFirebaseApp());
  return storageInstance;
};

const makeProxy = <T extends object>(getter: () => T): T =>
  new Proxy({} as T, {
    get(_, prop) {
      const target = getter() as Record<string | symbol, unknown>;
      const value = target[prop];
      return typeof value === "function" ? value.bind(target) : value;
    },
  });

export const auth: Auth = makeProxy(getFirebaseAuth);
export const db: Firestore = makeProxy(getDb);
export const storage: FirebaseStorage = makeProxy(getFirebaseStorage);
