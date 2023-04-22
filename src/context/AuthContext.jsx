import { createContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import { GoogleAuthProvider, onAuthStateChanged, signInWithRedirect, signOut } from "firebase/auth";
import { registerUsingGoogleAccount } from '../utils/login-utils';
import { redirect } from '../utils/login-utils';

const AuthContext = createContext({
    userId: '',
    followers: '',
    isLoggedIn: '',

    // functions
    updateUid: () => { },
    signInUsingGoogle: () => { },
    logout: () => { }
})

const AuthProvider = (props) => {
    const [userId, setUserId] = useState('')
    const [followers, setFollowers] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)


    // function
    const updateUid = (uid) => {
        setUserId(uid)
        console.log('user id updated : ' + uid)
    }

    // authentications

    const signInUsingGoogle = () => {
        const googleProvider = new GoogleAuthProvider()
        signInWithRedirect(auth, googleProvider)
    }

    const logout = () => {

        setIsLoggedIn(false)
        signOut(auth)
        redirect('')
    }

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userId = user.email && user.email.split('@')[0].replace(/[.]/g, '_')
                setUserId(userId)

                const provider = user.providerData[0].providerId
                // console.log(provider)

                if (provider === 'google.com') {
                    // console.log(user)
                    const name = user.displayName
                    const email = user.email

                    const res = await registerUsingGoogleAccount(userId, name, email)

                    if (res) {
                        // console.log('User added using Google Sign in')
                    } else {
                        // console.log('Error in Google Sign in login')
                    }
                }
            } else {
                setUserId(null)
            }
        })
    }, [auth])

    const authContext = {
        userId: userId,
        followers: followers,
        isLoggedIn: isLoggedIn,

        // functions
        updateUid: updateUid,
        signInUsingGoogle: signInUsingGoogle,
        logout: logout
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