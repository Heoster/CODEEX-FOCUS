
import { initializeApp, getApps, getApp, type FirebaseOptions } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Added Firestore import

const firebaseApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const firebaseAuthDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
const firebaseProjectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const firebaseStorageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
const firebaseMessagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
const firebaseAppId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;
const firebaseMeasurementId = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID;

const requiredEnvVars: Record<string, string | undefined> = {
  NEXT_PUBLIC_FIREBASE_API_KEY:"AIzaSyCg4mOcpCZjPTxYPi8bvvuJJYibd7NUaB4",
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:  "focusforge-sepaz.firebaseapp.com",
  NEXT_PUBLIC_FIREBASE_PROJECT_ID:  "focusforge-sepaz",
  // These are not strictly required for basic auth init, but good to check if you expect them
  // NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:  "focusforge-sepaz.firebasestorage.app",
  // NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:  "175219863291",
  // NEXT_PUBLIC_FIREBASE_APP_ID: "1:175219863291:web:3d4a9371c06a2610044a5e",
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

const firebaseConfig = {
  apiKey: "AIzaSyCg4mOcpCZjPTxYPi8bvvuJJYibd7NUaB4",
  authDomain: "focusforge-sepaz.firebaseapp.com",
  projectId: "focusforge-sepaz",
  storageBucket: "focusforge-sepaz.firebasestorage.app",
  messagingSenderId: "175219863291",
  appId: "1:175219863291:web:3d4a9371c06a2610044a5e",
  measurementId: "G-4NZZZ9M905"
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
const db = getFirestore(app); // Initialize Firestore

export { app, auth, db }; // Export db
