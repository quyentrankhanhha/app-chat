import * as firebase from 'firebase/app'
import 'firebase/auth'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

let config = {
  apiKey: 'AIzaSyDSWLGuahC3CxwyhJmRiIBXnAkdxA7EOhY',
  authDomain: 'chat-app-aff76.firebaseapp.com',
  projectId: 'chat-app-aff76',
  storageBucket: 'chat-app-aff76.appspot.com',
  messagingSenderId: '977091843763',
  appId: '1:977091843763:web:c6d6d90a85594e574142c6',
}
const firebaseApp = firebase.initializeApp(config)

export const auth = getAuth()
export const db = getFirestore(firebaseApp)
