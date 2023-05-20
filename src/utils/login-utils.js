import { database } from "../firebase"
import { set, ref, onValue, update, remove } from "firebase/database"
import { useNavigate } from "react-router-dom"

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const notifier = (msg, type) => {

    if (type == 'success') {
        toast.success(`${msg}`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    }
}

const redirect = (route) => {
    const navigate = useNavigate()
    navigate(`/${route}`)
}

const userLogIn = async  (userID, isLoggedIn, isLoggedInValue) => {
    update(ref(database, 'users/' + userID + '/details'), {
        [isLoggedIn]: isLoggedInValue
    })
    .then( (res) => {
        console.log('Login Done of user '+ userID)
        // don't add other lines with
    })
    .catch( (err) => {
        console.log('LogIn failed of the user with id ' + userID)
    })
}

const registerUser = async (userId, name, email, about, isLoggedIn) => {
    set(ref(database, 'users/' + userId + '/details'), {
        name: name,
        email: email,
        about: about,
        followers: [],
        isLoggedIn: isLoggedIn,
        blogCount: 0
    })
    .then( () => {
        console.log('User added successfully')
    })
    .catch((err) => {
        console.log(`error found ${err}`)
    })
}

const registerUsingGoogleAccount = async (userId, name, email) => {
    set(ref(database, 'users/' + userId + '/details'), {
        name: name,
        email: email,
        about: '',
        followers: [],
        isLoggedIn: true,
        blogCount: 0
    })
    .then((res) => {
        console.log('User added using Google Sign in')
    })
    .catch((err) => {
        console.log('Error Found in Google Sign in')
    })
}


export {registerUser, registerUsingGoogleAccount, redirect, userLogIn}