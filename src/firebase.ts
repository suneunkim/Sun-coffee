// Import the functions you need from the SDKs you need
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: 'sun-coffee-9078a',
  storageBucket: 'sun-coffee-9078a.appspot.com',
  messagingSenderId: '785555173432',
  appId: '1:785555173432:web:b76dcd1691fab1bc1e76cd',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const fireauth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
