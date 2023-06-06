import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, connectAuthEmulator } from "firebase/auth"
import { OAuthScopes } from "@/utils/AppConfig"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

if (process.env.NODE_ENV === "development") {
  process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
auth.useDeviceLanguage()

const googleProvider = new GoogleAuthProvider()
OAuthScopes.forEach((scope) => googleProvider.addScope(scope))

if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, "http://localhost:9099")
}

export { app, auth, googleProvider }
