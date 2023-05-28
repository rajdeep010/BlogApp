import { createContext, useEffect, useState } from 'react'
import { auth, database } from '../firebase'
import { GoogleAuthProvider, getRedirectResult, onAuthStateChanged, signInWithRedirect, signOut } from "firebase/auth";
import { registerUsingGoogleAccount } from '../utils/login-utils';
import { redirect } from '../utils/login-utils';
import { onValue, ref, update } from 'firebase/database';


const AuthContext = createContext({
    userId: '',
    isLoggedIn: '',

    // functions
    updateUid: () => { },
    signInUsingGoogle: () => { },
    logout: () => { },
    handleLogin: () => {}
})

const AuthProvider = (props) => {
    const [userId, setUserId] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    // const navigate = useNavigate()

    // const goToHome = () => {
    //     navigate('/')
    // }

    // function
    const updateUid = (uid) => {
        setUserId(uid)
        // console.log('user id updated : ' + uid)
    }

    // authentications
    const signInUsingGoogle = async () => {

        const googleProvider = new GoogleAuthProvider()
        await signInWithRedirect(auth, googleProvider)

        const res = await getRedirectResult(auth)
        if(res)
        {
            // console.log(result.user)
            isLoggedIn(true)
            redirect('/')
        }
    }


    const logout = () => {
        setIsLoggedIn(false)
        signOut(auth)
        .then(() => {
            // go to login signup page
            redirect('/login')
        })
        .catch((err) => {
            console.log( 'Error while logout : ' + err)
        })
    }


    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userId = user.email && user.email.split('@')[0].replace(/[.]/g, '_')
                setUserId(userId)

                const provider = user.providerData[0].providerId
                // console.log(provider)

                if (provider === 'google.com') 
                {
                    // console.log(user)
                    const name = user.displayName
                    const email = user.email

                    const res = await registerUsingGoogleAccount(userId, name, email)

                }
            } else {
                setUserId(null)
                setIsLoggedIn(false)
            }
        })
    }, [auth])
    

    useEffect(() => {
        if(userId)
        {
            const dbRef = ref(database, 'users/' + userId + '/details')
            onValue(dbRef, (snapshot) => {
                if(snapshot){                   
                    setIsLoggedIn(true)
                }
            })
        }
    }, [userId])


    const authContext = {
        userId: userId,
        isLoggedIn: isLoggedIn,

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