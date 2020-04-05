import firebase from 'firebase/app'
import 'firebase/firestore'

export const db = firebase
  .initializeApp({ 
      apiKey: process.env.apiKey,
      authDomain: process.env.authDomain,
      projectId: process.env.projectId,
    })
  .firestore()