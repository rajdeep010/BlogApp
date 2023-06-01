import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCNuSxmv_pSvBjheTusjzeA6O1rUiTUgs8",
  authDomain: "codioshare.firebaseapp.com",
  databaseURL: "https://codioshare-default-rtdb.firebaseio.com",
  projectId: "codioshare",
  storageBucket: "codioshare.appspot.com",
  messagingSenderId: "1055493280726",
  appId: "1:1055493280726:web:292c76e789c217c063ca77"
};

const app = initializeApp(firebaseConfig)

const database = getDatabase()  // firebase realtime database
const storage = getStorage()    // firebase storage
const auth = getAuth(app)


export { database, auth, storage }
