import { database } from "../firebase"
import { set, ref, onValue, update, remove } from "firebase/database"
import { useNavigate } from "react-router-dom"



const redirect = (route) => {
    const navigate = useNavigate()
    navigate(`/${route}`)
}


const userLogIn = async (userID, isLoggedIn, isLoggedInValue) => {

    update(ref(database, 'users/' + userID + '/details'), {
        [isLoggedIn]: isLoggedInValue
    })
        .then((res) => {
            console.log('Login Done of user ' + userID)
            // don't add other lines with
        })
        .catch((err) => {
            console.log('LogIn failed of the user with id ' + userID)
        })
}


const registerUser = async (userId, name, email, about, isLoggedIn) => {

    set(ref(database, 'users/' + userId + '/details'), {
        name: name,
        email: email,
        about: about,
        isLoggedIn: isLoggedIn,
        blogCount: 0,
        bookmarked: 0
    })
        .then(() => {
            console.log('User added successfully')
        })
        .catch((err) => {
            console.log(`error found ${err}`)
        })
}

const registerUsingGoogleAccount = async (userId, name, email) => {

    const checkRef = ref(database, 'users/' )
    
    let res
    onValue(checkRef, (snapshot) => {
        res = snapshot.val()
    })

    console.log(res)

    let found = false
    for(const key in res){
        if(key === userId){
            found = true
            break
        }
    }

    if(found)
        return

    const dbRef = ref(database, 'users/' + userId + '/details')


    update(dbRef, {
        name: name,
        email: email,
        isLoggedIn: true,
        blogCount: 0,
        bookmarked: 0
    }).then((res) => {
        console.log('hello google sign in multiple times')

        onValue(dbRef, (snapshot) => {
            if(snapshot.val() === null)
            {
                update(ref(dbRef, {
                    avatarURL: `https://firebasestorage.googleapis.com/v0/b/sample-blog-1d6c6.appspot.com/o/avatars%2F${name.trim()[0].toUpperCase()}.jpg?alt=media&token=35495b1a-8fce-459e-8a88-5e25a0b15af3`
                }))
            }
        },{
            onlyOnce: true
        })
    })
    .catch((err) => {
        console.log('Goole Register Failed')
    })
}


export { registerUser, registerUsingGoogleAccount, redirect, userLogIn }