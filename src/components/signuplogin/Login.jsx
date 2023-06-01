import '../../styles/signup.scss'
import { FaUser, FaLock } from 'react-icons/fa'
import { AuthContext } from '../../context/AuthContext'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GoogleButton from 'react-google-button'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, database } from '../../firebase'
import { notifier } from '../../utils/notify'
import { ToastContainer } from 'react-toastify'
import { registerUsingGoogleAccount } from '../../utils/login-utils'
import { onValue, ref } from 'firebase/database'



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
    }

    const handleGoogleSignIn = async () => {

        await authCtx.googleSignIn()
            .then(async (res) => {
                const creationTime = res.user.metadata.creationTime
                const lastSignInTime = res.user.metadata.lastSignInTime

                if (creationTime === lastSignInTime) {
                    const name = res.user.displayName
                    const email = res.user.email
                    const userId = email && email.split('@')[0].replace(/[.]/g, '_')

                    await registerUsingGoogleAccount(userId, name, email)
                        .then(() => {
                            notifier('Logged in as ' + userId, 'success')
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }

                else {
                    // fetch out the details
                    const email = res.user.email
                    const userId = email && email.split('@')[0].replace(/[.]/g, '_')

                    const dbref = ref(database, 'users/' + userId +'/details')
                    let name = ''
                    onValue(dbref, (snapshot) => {
                        if(snapshot)
                            name = snapshot.val().name
                    })

                    // console.log(name)
                }

                notifier('Google Sign in Successful', 'success')
                setTimeout(() => { goToHome() }, 3000)
            })
            .catch((err) => {
                console.log('Error' + err)
            })
    }

    return (
        <>
            <div className="login_container box">

                <form className="log-in-form">

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