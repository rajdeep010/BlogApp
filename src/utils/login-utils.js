import { database } from "../firebase"
import { set, ref, onValue, update, remove } from "firebase/database"

const registerUser = async (userId, name, email, about, followers) => {
    set(ref(database, 'users/' + userId + '/details'), {
        name: name,
        email: email,
        about: about,
        followers: followers
    })
    .then( (res) => {
        console.log('User added successfully')
    })
    .catch((err) => {
        console.log(`error found ${err}`)
    })
}


export {registerUser}