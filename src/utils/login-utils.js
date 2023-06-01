import { database } from "../firebase"
import { set, ref, onValue, update } from "firebase/database"
import { useNavigate } from "react-router-dom"



const redirect = (route) => {
    const navigate = useNavigate()
    navigate(`/${route}`)
}


const registerUser = async (userId, name, email, about) => {

    set(ref(database, 'users/' + userId + '/details'), {
        name: name,
        email: email,
        about: about,
        blogCount: 0,
        bookmarked: 0
    })
        .then(() => {
            // console.log('User added successfully')
        })
        .catch((err) => {
            // console.log(`error found ${err}`)
        })
}

const registerUsingGoogleAccount = async (userId, name, email) => {

    const dbRef = ref(database, 'users/' + userId + '/details')

    // console.log(name, email, userId)

    update(dbRef, {
        name: name,
        email: email,
        blogCount: 0,
        bookmarked: 0
    }).then((res) => {
        // console.log('hello google sign in multiple times')

        onValue(dbRef, (snapshot) => {
            if (snapshot.val() === null) {
                update(ref(dbRef, {
                    avatarURL: `https://firebasestorage.googleapis.com/v0/b/sample-blog-1d6c6.appspot.com/o/avatars%2F${name.trim()[0].toUpperCase()}.jpg?alt=media&token=35495b1a-8fce-459e-8a88-5e25a0b15af3`
                }))
            }
        }, {
            onlyOnce: true
        })
    })
        .catch((err) => {
            console.log('Goole Register Failed')
        },
        )
}


export { registerUser, registerUsingGoogleAccount, redirect }