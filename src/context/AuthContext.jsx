import { createContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext({
    userId: '',
    followers: '',
    isLoggedIn: '',

    // functions
    updateUid: () => { }
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

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log(user.email)
                const userId = user.email && user.email.split('@')[0].replace(/[.]/g, '_')
                setUserId(userId)
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
        updateUid: updateUid
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