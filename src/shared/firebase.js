import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

import { config } from './firebaseConfig'

firebase.initializeApp(config)

export const database = firebase.database()
export const auth = firebase.auth()
export const storage = firebase.storage()