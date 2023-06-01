import './signup.scss'
import { FaUser, FaLock } from 'react-icons/fa'
import { AuthContext } from '../../context/AuthContext'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GoogleButton from 'react-google-button'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'
import { notifier } from '../../utils/notify'
import { ToastContainer } from 'react-toastify'



const Login = () => {

    const authCtx = useContext(AuthContext)

    const navigate = useNavigate()
    const goToHome = () => {
        navigate('/dashboard')
    }

    // -------- EMAIL & PASSWORD FETCH
    const [fields, setFields] = useState({
        email: '',
        password: ''
    })

    let key, value
    const getLoginDetails = (e) => {
        key = e.target.name
        value = e.target.value
        setFields({ ...fields, [key]: value })
    }

    const handleLogin = async (e) => {
        e.preventDefault()

        const email = fields.email, password = fields.password

        if (email.trim().length === 0) {
            notifier('Email not valid !!', 'error')
            return
        }

        if (password.trim().length === 0) {
            notifier('Check your password', 'warning')
            return
        }

        if (email.trim().length === 0 && password.trim().length === 0) {
            notifier('All fields required', 'info')
            return
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredentials) => {

                if (!userCredentials.user.emailVerified) {
                    notifier('Email is not verified', 'info')
                    return
                }

                else {
                    notifier('Logged In Successfully', 'success')
                    setTimeout(() => { goToHome() }, 3000)
                }
            })
            .catch((err) => {
                notifier('Invalid credentials !!!', 'error')
            })

        // await authCtx.logIn(fields.email, fields.password)
        //     .then(async () => {
        //         notifier('Logged in successful', 'success')
        //         notifier('Redirecting to dashboard', 'info')
        //         setTimeout(() => {goToHome()}, 3000)
        //     })
        //     .catch((err) => {
        //         if (err.message === 'Firebase: Error (auth/wrong-password).') {
        //             notifier('Wrong Credentials', 'error')
        //         }

        //         else {
        //             notifier('User not found', 'error')
        //         }
        //     })
    }

    const handleGoogleSignIn = async () => {
        // e.preventDefault()

        await authCtx.googleSignIn()
            .then(() => {
                notifier('Google Sign in Successful', 'success')
                setTimeout(() => { goToHome() }, 3000)
            })
            .catch((err) => {
                console.log('Error' + err)
            })
    }

    // const LogInElement = () => {



    //     // -------- EMAIL & PASSWORD FETCH
    //     const googleSignIn = () => {
    //         authCtx.signInUsingGoogle()
    //     }

    //     const handleLogin = async (event) => {
    //         event.preventDefault()
    //         const email = user.email, password = user.password


    //         if (email.trim().length === 0) {
    //             notifier('Email not valid !!', 'error')
    //             return
    //         }

    //         if (password.trim().length === 0) {
    //             notifier('Check your password', 'warning')
    //             return
    //         }

    //         if (email.trim().length === 0 && password.trim().length === 0) {
    //             notifier('All fields required', 'info')
    //             return
    //         }

    // signInWithEmailAndPassword(auth, email, password)
    //     .then(async (userCredentials) => {

    //         // console.log(userCredentials)

    //         if (!userCredentials.user.emailVerified) {
    //             authCtx.updateAuthStatus(false)
    //             authCtx.updateUser(null)
    //             notifier('Email is not verified', 'info')
    //             return
    //         }

    //         else {
    //             const userID = email.split('@')[0].replace(/[.]/g, '_')

    //             authCtx.updateUid(userID)
    //             authCtx.updateAuthStatus(true)
    //             goToHome()
    //             notifier('Logged In Successfully', 'success')
    //         }
    //     })
    //     .catch((err) => {
    //         notifier('Invalid credentials !!!', 'error')
    //     })
    //     }


    //     return (
    //         <>
    //             <h2 className='heading'>LOG <span>IN</span></h2>

    //             <div className="input-field">
    //                 <FaUser className='icon' />
    //                 <input type="email" placeholder="Email" name="email" value={user.email} onChange={getLoginDetails} autoComplete='off' />
    //             </div>

    //             <div className="input-field">
    //                 <FaLock className='icon' />
    //                 <input type="password" placeholder="Password" name="password" value={user.password} onChange={getLoginDetails} autoComplete='off' />
    //             </div>

    //             <br />

    //             <button type="submit" className="btn" onClick={handleLogin}> Log In</button>

    //             <br />

    //             <GoogleButton onClick={googleSignIn} style={{ backgroundColor: "#11d7ff", fontFamily: "Poppins, sans-serif" }} />
    //         </>
    //     )
    // }

    return (
        <>
            <div className="login_container box">

                <form className="log-in-form">
                    {/* {(authCtx.user && authCtx.userId) ? (<button className="btn" onClick={goToHome}>Go To Home</button>) : <LogInElement />} */}
                    {/* <LogInElement /> */}

                    <h2 className='heading'>LOG <span>IN</span></h2>

                    <div className="input-field">
                        <FaUser className='icon' />
                        <input type="email" placeholder="Email" name="email" value={fields.email} onChange={getLoginDetails} autoComplete='off' />
                    </div>

                    <div className="input-field">
                        <FaLock className='icon' />
                        <input type="password" placeholder="Password" name="password" value={fields.password} onChange={getLoginDetails} autoComplete='off' />
                    </div>

                    <br />

                    <button type="submit" className="btn" onClick={handleLogin}> Log In</button>

                    <br />

                    <GoogleButton onClick={handleGoogleSignIn} style={{ backgroundColor: "#11d7ff", fontFamily: "Poppins, sans-serif" }} />
                </form>

            </div>

            <ToastContainer />
        </>
    )
}

export default Login