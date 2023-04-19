import { createContext, useState } from 'react'
import { database } from '../firebase'
import { auth } from '../firebase'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
  } from "firebase/auth";
  
const AuthContext = createContext({
    userId: '',
    isAuthorised: '',
    userData: '',
    followers: '',
    
    // functions
    updateUserData: () => {},
    updateAuthStatus: () => {}
})

const AuthProvider = (props) => {
    const [userId, setUserId] = useState('')
    const [isAuthorised, setIsAuthorised] = useState(false)
    const [userData, setUserData] = useState('')
    const [followers, setFollowers] = useState(null)

    // implement functions
    const updateAuthStatus = (isAuthorised) => {
        setIsAuthorised(isAuthorised)
    }

    const updateUserData = (userData) => {
        setUserData(userData)
    }


    // authentications
    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    onAuthStateChanged(auth, async(user) => {
        if(user)
        {
            console.log(user)
        }

        else{
            setUserId(null)
            setIsAuthorised(false)
        }
    })

    const authContext = {
        userId: userId,
        userData: userData,
        isAuthorised: isAuthorised,
        followers: followers,

        // functions
        updateAuthStatus: updateAuthStatus,
        updateUserData: updateUserData
    }


    // return provider
    return (
        <AuthContext.Provider value={authContext}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
export { AuthContext }