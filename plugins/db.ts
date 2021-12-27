import { initializeApp } from 'firebase/app'
import firebase from 'firebase/compat'

if (firebase.app.length === 0) {
  initializeApp({
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
  })
}
