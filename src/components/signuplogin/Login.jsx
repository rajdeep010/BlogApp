import './signup.scss'
import { FaUser, FaLock } from 'react-icons/fa'

import { AuthContext } from '../../context/AuthContext'
import { useContext,useState } from 'react'
import { useNavigate } from 'react-router-dom'

import GoogleButton from 'react-google-button'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'
import { userLogIn } from '../../utils/login-utils'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {

    const authCtx = useContext(AuthContext)

    const navigate = useNavigate()
    const goToHome = () => {
        navigate('/')
    }

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

    // -------- EMAIL & PASSWORD FETCH
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    let key, value;
    const getLoginDetails = (e) => {
        key = e.target.name
        value = e.target.value
        setUser({ ...user, [key]: value })
    }

    // -------- EMAIL & PASSWORD FETCH

    
    const signInUsingGoogle = () => {
        authCtx.signInUsingGoogle()
        goToHome()
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        const email = user.email, password = user.password

        // console.log(email + ' ' + password)

        if(email.trim().length === 0 || password.trim().length === 0){
            console.log('email or password length 0')
            return
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredentials) => {

            // console.log(userCredentials)

            //  *** not sent any email verification code so
            // uncomment till now ***

            // if(!userCredentials.user.emailVerified){
            //     console.log('Email not verified')
            //     return
            // }

            const userID = email.split('@')[0].replace(/[.]/g, '_')
            await userLogIn(userID, 'isLoggedIn', true)
            // notifier('Logged In Successfully', 'success')
            goToHome()
        })
        .catch((err) => {
            console.log('Error occurred while login ' + err)
        })
    }
    
    return (
        <>
            <div className="login_container box">

                <form action="/login" className="log-in-form" method="post">

                    <h2 className='heading'>LOG <span>IN</span></h2>

                    <div class="input-field">
                        <FaUser className='icon' />
                        <input type="email" placeholder="Email" name="email" value={user.email} onChange={getLoginDetails} autoComplete='off' />
                    </div>

                    <div class="input-field">
                        <FaLock className='icon' />
                        <input type="password" placeholder="Password" name="password" value={user.password} onChange={getLoginDetails} autoComplete='off' />
                    </div>

                    {/* <br /> */}

                    {/* <h6>Couldn't remember the password ?<NavLink to='/'> Click Here?</NavLink></h6> */}

                    <br />

                    <button type="submit" className="btn" onClick={handleLogin}> Log In</button>

                    <br />

                    <GoogleButton onClick={signInUsingGoogle} style={{ backgroundColor: "#11d7ff", fontFamily: "Poppins, sans-serif" }} />
                </form>

            </div>
        </>
    )
}

export default Login