import { createContext, useEffect, useState } from 'react'
import { auth, database } from '../firebase'
import { GoogleAuthProvider, getRedirectResult, onAuthStateChanged, signInWithRedirect, signOut } from "firebase/auth";
import { registerUsingGoogleAccount } from '../utils/login-utils';
import { redirect } from '../utils/login-utils';
import { onValue, ref } from 'firebase/database';
import { notifier } from '../utils/notify';


const AuthContext = createContext({
    userId: '',
    isLoggedIn: '',
    isAuthenticated: '',

    // functions
    updateUid: () => { },
    signInUsingGoogle: () => { },
    logout: () => { },
    handleLogin: () => { }
})

const AuthProvider = (props) => {
    const [userId, setUserId] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)


    // function
    const updateUid = (uid) => {
        setUserId(uid)
    }

    // authentications
    const signInUsingGoogle = async () => {
        const googleProvider = new GoogleAuthProvider()
        await signInWithRedirect(auth, googleProvider)

        const res = await getRedirectResult(auth)
        if (res) {
            setIsAuthenticated(true)
            isLoggedIn(true)
            redirect('/dashboard')
        }
    }

    const logout = () => {
        signOut(auth)
    }

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userId = user.email && user.email.split('@')[0].replace(/[.]/g, '_')
                setUserId(userId)
                const provider = user.providerData[0].providerId
                // console.log(provider)

                if (provider === 'google.com') {
                    let name = user.displayName
                    const email = user.email

                    await registerUsingGoogleAccount(userId, name, email)
                    .then(() => {
                        notifier('Logged in as ' + userId, 'success')
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                }
            } else {
                setUserId(null)
                setIsLoggedIn(false)
                setIsAuthenticated(false)
            }
        },{
            onlyOnce: true
        }
        )
    }, [auth])


    useEffect(() => {
        if (userId) {
            const dbRef = ref(database, 'users/' + userId)

            onValue(dbRef, (snapshot) => {

                const details = null || (snapshot.val() && snapshot.val().details)

                if (details) {
                    setIsAuthenticated(true)
                }
            }, {
                onlyOnce: true
            })
        }
    }, [userId])


    const authContext = {
        userId: userId,
        isLoggedIn: isLoggedIn,
        isAuthenticated: isAuthenticated,

        // functions
        updateUid: updateUid,
        signInUsingGoogle: signInUsingGoogle,
        logout: logout,
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