
import { initializeApp, getApps, getApp, type FirebaseOptions } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const firebaseAuthDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
const firebaseProjectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const firebaseStorageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
const firebaseMessagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
const firebaseAppId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;
const firebaseMeasurementId = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID;

const requiredEnvVars: Record<string, string | undefined> = {
  NEXT_PUBLIC_FIREBASE_API_KEY: firebaseApiKey,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: firebaseAuthDomain,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: firebaseProjectId,
  // These are not strictly required for basic auth init, but good to check if you expect them
  // NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: firebaseStorageBucket,
  // NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: firebaseMessagingSenderId,
  // NEXT_PUBLIC_FIREBASE_APP_ID: firebaseAppId,
};

const missingKeys = Object.entries(requiredEnvVars)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missingKeys.length > 0) {
  const errorMessage =
    `!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n` +
    `Firebase Configuration Error: The following required environment variable(s) are MISSING or UNDEFINED:\n` +
    `${missingKeys.join(', \n')}\n` +
    `Please ensure they are correctly set in your .env.local file (in the project root) using the NEXT_PUBLIC_ prefix, \n` +
    `and that you have RESTARTED your Next.js development server after changes.\n` +
    `Firebase will NOT initialize correctly without them.\n` +
    `Example .env.local entry: NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyYOURKEYHERE\n` +
    `!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`;
  console.error(errorMessage);
  // This error will be thrown if any of the critical Firebase environment variables are not set
  // or if the Next.js server was not restarted after setting them in .env.local.
  throw new Error(errorMessage);
}

const firebaseConfig: FirebaseOptions = {
  apiKey: firebaseApiKey!,
  authDomain: firebaseAuthDomain!,
  projectId: firebaseProjectId!,
  storageBucket: firebaseStorageBucket,
  messagingSenderId: firebaseMessagingSenderId,
  appId: firebaseAppId,
  measurementId: firebaseMeasurementId,
};

// Initialize Firebase
let app;
if (getApps().length === 0) {
  try {
    app = initializeApp(firebaseConfig);
  } catch (error) {
    console.error("Firebase initialization error:", error);
    throw new Error(
      `Firebase failed to initialize. Please check your Firebase console for issues with your project or API key. Original error: ${error}`
    );
  }
} else {
  app = getApp();
}

const auth = getAuth(app);

export { app, auth };
