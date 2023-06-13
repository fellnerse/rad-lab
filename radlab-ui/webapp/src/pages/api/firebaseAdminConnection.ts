import admin from "firebase-admin"
import { getFirestore } from "firebase-admin/firestore"

import { applicationDefault, initializeApp } from 'firebase-admin/app';

if (admin.apps.length === 0) {
  initializeApp({credential: applicationDefault()})
}

const db = getFirestore()

const auth = admin.auth()

export { db, auth }
