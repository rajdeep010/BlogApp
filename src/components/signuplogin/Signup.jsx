import { useState, useContext } from 'react'
import '../../styles/signup.scss'
import { AuthContext } from '../../context/AuthContext'
import { FaUser, FaLock, FaPen, FaKey } from 'react-icons/fa'
import { auth } from '../../firebase'
import { redirect, registerUser } from '../../utils/login-utils';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { notifier } from '../../utils/notify'
import { ToastContainer } from 'react-toastify'


const Signup = () => {

    // Auth Context
    const authCtx = useContext(AuthContext)


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

    const dummyHandleSignup = async (e) => {
        e.preventDefault()

        const email = user.email, password = user.password

        await authCtx.signUp(email, password)
        .then(() => {
            notifier('Account created Sueccessfully', 'success')
            redirect('/login')
        })
        .catch((err) => {
            console.log('Sign up problem: ' + err)
        })
    }

    const handleSignup = (e) => {
        e.preventDefault()

        const name = user.name, about = user.about, email = user.email, password = user.password

        if (name.trim().length === 0) {
            notifier('Please fill the Name', 'info')
            return
        }

        if (email.trim().length === 0) {
            notifier('Please fill the Email', 'info')
            return
        }

        if (password.trim().length === 0) {
            notifier('Please fill the Password', 'info')
            return
        }

        const emailRegex = /^[A-Za-z_.0-9]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,5}$/
        const isEmailValid = emailRegex.test(email)

        if (!isEmailValid) {
            notifier('Email is not Valid', 'error')
            return
        }

        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{6,16}$/
        const isPasswordValid = passwordRegex.test(password)

        if (!isPasswordValid) {
            notifier('Passwords must contain 1 Uppercase, 1 Lowercase, 1 Numeric, 1 Special Character and No space', 'error')
            return
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredentials) => {

                const user = auth.currentUser
                await sendEmailVerification(user)
                    .then(() => {
                        notifier('Email Verification Link Sent', 'info')
                        setUser({
                            name: '',
                            email: '',
                            about: '',
                            password: ''
                        })
                    })

                const userId = email && email.split('@')[0].replace(/[.]/g, '_')

                // console.log('This is before register' + authCtx)

                await registerUser(userId, name, email, about)
                    .then(() => {
                        notifier('Account Created Successfully', 'success')
                        authCtx.updateUid(userId)
                        // console.log( 'After register : ' + authCtx)
                    })
                    .catch((err) => {
                        notifier('Something went wrong', 'error')
                    })


            })
            .catch((err) => {
                notifier('Email already registered', 'error')
            })
    }

    return (
        <>
            <div className="signin_container box">

                <form>
                    <h2 className='heading'>SIGN <span>UP</span></h2>

                    <div className="input-field">
                        <FaPen className='icon' />
                        <input type="text" placeholder="Full Name" name="name" value={user.name} onChange={getUserData} autoComplete='off' />
                    </div>

                    <div className="input-field">
                        <FaUser className='icon' />
                        <input type="email" placeholder="Email" name="email" value={user.email} onChange={getUserData} autoComplete='off' />
                    </div>

                    <div className="input-field">
                        <FaKey className='icon' />
                        <input type="text" placeholder="About (eg. Guardian on LeetCode)" name="about" value={user.about} onChange={getUserData} autoComplete='off' />
                    </div>

                    <div className="input-field">
                        <FaLock className='icon' />
                        <input type="password" placeholder="Password" name="password" value={user.password} onChange={getUserData} autoComplete='off' />
                    </div>

                    <br />
                    <button type="submit" className="btn" onClick={handleSignup}>Sign Up </button>

                </form>

            </div>

            <ToastContainer />
        </>
    )
}

export default Signup