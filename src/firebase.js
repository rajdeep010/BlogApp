import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDvE0mq-ok6LN2LqFpkOtUmS2Qck6hmjqE",
    authDomain: "sample-blog-1d6c6.firebaseapp.com",
    databaseURL: "https://sample-blog-1d6c6-default-rtdb.firebaseio.com",
    projectId: "sample-blog-1d6c6",
    storageBucket: "sample-blog-1d6c6.appspot.com",
    messagingSenderId: "407959813652",
    appId: "1:407959813652:web:a405bc1f6e2a8042ea7101"
};

const app = initializeApp(firebaseConfig)

const database = getDatabase()  // firebase realtime database
const auth = getAuth(app)

export { database, auth }
