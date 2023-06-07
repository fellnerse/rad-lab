import admin from "firebase-admin"
import { getFirestore } from "firebase-admin/firestore"

if (admin.apps.length === 0) {
  admin.initializeApp()
}
const db = getFirestore()
// todo find way of using emulator also with firebase-admin
// if (window.location.hostname === "localhost") {
//   connectFirestoreEmulator(db, "localhost", 8080)
// }
export { db }
