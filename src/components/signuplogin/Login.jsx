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
        navigate('/')
    }

    const LogInElement = () => {

        // -------- EMAIL & PASSWORD FETCH
        const [user, setUser] = useState({
            email: '',
            password: ''
        })

        let key, value
        const getLoginDetails = (e) => {
            key = e.target.name
            value = e.target.value
            setUser({ ...user, [key]: value })
        }

        // -------- EMAIL & PASSWORD FETCH
        const signInUsingGoogle = () => {
            authCtx.signInUsingGoogle()
        }

        const handleLogin = async (event) => {
            event.preventDefault()
            const email = user.email, password = user.password

            
            if(email.trim().length === 0){
                notifier('Email not valid !!', 'error')
                return
            }

            if(password.trim().length === 0){
                notifier('Check your password', 'warning')
                return
            }

            if (email.trim().length === 0 && password.trim().length === 0) {
                notifier('All fields required', 'info')
                return
            }

            signInWithEmailAndPassword(auth, email, password)
                .then(async (userCredentials) => {

                    // console.log(userCredentials)

                    if(!userCredentials.user.emailVerified){
                        notifier('Email is not verified', 'info')
                        return
                    }

                    else
                    {
                        const userID = email.split('@')[0].replace(/[.]/g, '_')

                        authCtx.updateUid(userID)
                        authCtx.isLoggedIn = true
                        authCtx.isAuthenticated = true
                        goToHome()
                        notifier('Logged In Successfully', 'success')
                    }
                })
                .catch((err) => {
                    notifier('Invalid credentials !!!', 'error')
                })
        }


        return (
            <>
                <h2 className='heading'>LOG <span>IN</span></h2>

                <div className="input-field">
                    <FaUser className='icon' />
                    <input type="email" placeholder="Email" name="email" value={user.email} onChange={getLoginDetails} autoComplete='off' />
                </div>

                <div className="input-field">
                    <FaLock className='icon' />
                    <input type="password" placeholder="Password" name="password" value={user.password} onChange={getLoginDetails} autoComplete='off' />
                </div>

                <br />

                <button type="submit" className="btn" onClick={handleLogin}> Log In</button>

                <br />

                <GoogleButton onClick={signInUsingGoogle} style={{ backgroundColor: "#11d7ff", fontFamily: "Poppins, sans-serif" }} />
                
            </>
        )
    }

    return (
        <>
            <div className="login_container box">

                <form className="log-in-form">
                    {(authCtx.isAuthenticated) ? (<button className="btn" onClick={goToHome}>Go To Home</button>) : <LogInElement />}
                </form>
                
            </div>

            <ToastContainer />
        </>
    )
}

export default Login