import { database } from "../firebase"
import { set, ref, onValue, update, remove } from "firebase/database"
import { useNavigate } from "react-router-dom"

const redirect = (route) => {
    const navigate = useNavigate()
    navigate(`/${route}`)
}

const registerUser = async (userId, name, email, about, followers, isLoggedIn) => {
    set(ref(database, 'users/' + userId + '/details'), {
        name: name,
        email: email,
        about: about,
        followers: [],
        isLoggedIn: isLoggedIn,
        blogCount: 0
    })
    .then( (res) => {
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


export {registerUser, registerUsingGoogleAccount, redirect}