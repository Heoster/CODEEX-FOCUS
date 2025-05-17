
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
    // Depending on the error, you might want to throw it or handle it gracefully
    // For "auth/invalid-api-key", this catch block might not be reached if the SDK throws it internally earlier.
    throw new Error(
      `Firebase failed to initialize. Please check your Firebase console for issues with your project or API key. Original error: ${error}`
    );
  }
} else {
  app = getApp();
}

const auth = getAuth(app);

export { app, auth };
