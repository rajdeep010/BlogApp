import { useState, useContext } from 'react'
import './signup.scss'
import { AuthContext } from '../../context/AuthContext'
import { FaUser, FaLock, FaPen, FaKey } from 'react-icons/fa'

import { auth } from '../../firebase'
import { registerUser } from '../../utils/login-utils';
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword } from 'firebase/auth'


const Signup = () => {

    const navigate = useNavigate()
    const goToHome = () => {
        navigate('/')
    }
    // Auth Context
    const authCtx = useContext(AuthContext)

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

    // state change handled
    const [user, setUser] = useState({
        name: '',
        email: '',
        about: '',
        password: ''
    })

    let key, value;
    const getUserData = (e) => {
        key = e.target.name
        value = e.target.value
        setUser({ ...user, [key]: value })
    }

    const handleSignup = (e) => {
        e.preventDefault()

        const name = user.name, about = user.about, email = user.email, password = user.password

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredentials) => {

                // console.log(userCredentials)
                // console.log(email)

                const userId = email && email.split('@')[0].replace(/[.]/g, '_')
                // console.log(userId)

                await registerUser(userId, name, email, about, true)
                    .then(() => {
                        notifier('Account Created Successfully', 'success')
                        setTimeout(goToHome, 3000)
                        authCtx.updateUid(userId)
                    })
                    .catch((err) => {
                        console.log('Error when sign up' + err)
                    })
            })
    }

    return (
        <>
            <div className="signin_container box">

                <form action="/signin" className="sign-in-form" method="post">
                    <h2 className='heading'>SIGN <span>UP</span></h2>

                    <div class="input-field">
                        <FaPen className='icon' />
                        <input type="text" placeholder="Full Name" name="name" value={user.name} onChange={getUserData} autoComplete='off' />
                    </div>

                    <div class="input-field">
                        <FaUser className='icon' />
                        <input type="email" placeholder="Email" name="email" value={user.email} onChange={getUserData} autoComplete='off' />
                    </div>

                    <div class="input-field">
                        <FaKey className='icon' />
                        <input type="text" placeholder="About (eg. Guardian on LeetCode)" name="about" value={user.about} onChange={getUserData} autoComplete='off' />
                    </div>

                    <div class="input-field">
                        <FaLock className='icon' />
                        <input type="password" placeholder="Password" name="password" value={user.password} onChange={getUserData} autoComplete='off' />
                    </div>

                    <br />
                    <button type="submit" className="btn" onClick={handleSignup}>Sign Up </button>

                </form>

            </div>
        </>
    )
}

export default Signup