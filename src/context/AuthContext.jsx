import { createContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import { GoogleAuthProvider, createUserWithEmailAndPassword, getRedirectResult, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";
import { registerUsingGoogleAccount } from '../utils/login-utils';
import { redirect } from '../utils/login-utils';
import { notifier } from '../utils/notify';



const AuthContext = createContext({
    userId: '',
    isAuthenticated: '',
    user: {},

    // functions
    updateUid: () => { },
    signInUsingGoogle: () => { },
    logout: () => { },
    handleLogin: () => { },
    updateAuthStatus: () => { },
    updateUser: () => { },


    // auth-func
    logIn: () => { },
    signUp: () => { },
    googleSignIn: () => { }
})


const AuthProvider = (props) => {
    const [user, setUser] = useState({})
    const [userId, setUserId] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    // function
    const updateUid = (uid) => {
        setUserId(uid)
    }

    const updateUser = (status) => {
        setUser(status)
    }

    const updateAuthStatus = (status) => {
        setIsAuthenticated(status)
    }

    // authentications
    const signInUsingGoogle = async () => {
        const googleProvider = new GoogleAuthProvider()
        await signInWithRedirect(auth, googleProvider)

        const res = await getRedirectResult(auth)
        if (res) {
            setIsAuthenticated(true)
            redirect('/dashboard')
        }
    }

    const logout = () => {
        return signOut(auth)
    }

    const logIn = async (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = () => {
        const googleAuthProvider = new GoogleAuthProvider()
        return signInWithPopup(auth, googleAuthProvider)
    }

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userId = user.email && user.email.split('@')[0].replace(/[.]/g, '_')
                setUserId(userId)
                setUser(user)

                const provider = user.providerData[0].providerId

                if (provider === 'google.com') 
                {
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
                setIsAuthenticated(false)
                setUser(null)
            }
        })

        return () => {
            unsubscribe()
        }
    }, [])


    const authContext = {
        userId: userId,
        isAuthenticated: isAuthenticated,
        user: user,

        // functions
        updateUid: updateUid,
        signInUsingGoogle: signInUsingGoogle,
        logout: logout,
        updateAuthStatus: updateAuthStatus,
        updateUser: updateUser,


        logIn: logIn,
        signUp: signUp,
        googleSignIn: googleSignIn
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