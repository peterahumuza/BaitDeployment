// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getPerformance } from "firebase/performance";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
};

export const isICRC = process.env.NEXT_PUBLIC_DISPLAY_ICRC === "true";

function ensureAllEnvVariablesAreSet() {
// ensure all env vars are set
  if (process.env.NEXT_PUBLIC_DISPLAY_ICRC === undefined) {
    throw new Error("Missing env var NEXT_PUBLIC_DISPLAY_ICRC");
  }
  Object.keys(firebaseConfig).forEach(key => {
    if (!firebaseConfig[key]) {
      throw new Error(`Missing env var ${key}`);
    }
  });
}

ensureAllEnvVariablesAreSet();

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export let performance = ""

export let analytics = "";
if (app.name && typeof window !== "undefined") {
  analytics = getAnalytics(app);
  performance = getPerformance(app);
}