
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseAPIKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

// This check helps during development to ensure the key is at least present.
// The "auth/invalid-api-key" error from Firebase itself will trigger if the key
// is present but malformed, incorrect for the project, or restricted.
if (!firebaseAPIKey) {
  console.error(
    "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n" +
    "Firebase API Key (NEXT_PUBLIC_FIREBASE_API_KEY) is MISSING or UNDEFINED.\n" +
    "Please ensure it is correctly set in your .env.local file (in the project root)\n" +
    "and that you have RESTARTED your Next.js development server after changes.\n" +
    "Firebase will NOT initialize correctly without it.\n" +
    "Example: NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyYOURKEYHERE\n" +
    "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
  );
}

const firebaseConfig = {
  apiKey: firebaseAPIKey,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
