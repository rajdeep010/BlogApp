import './signup.scss'
import { FaUser, FaLock } from 'react-icons/fa'

import { NavLink } from 'react-router-dom'

import { AuthContext } from '../../context/AuthContext'
import { useContext } from 'react'

import GoogleButton from 'react-google-button'

const Login = () => {

    const authCtx = useContext(AuthContext)

    const signInUsingGoogle = () => {
        authCtx.signInUsingGoogle()
    }
    
    return (
        <>
            <div className="login_container box">

                <form action="/login" className="log-in-form" method="post">

                    <h2 className='heading'>LOG <span>IN</span></h2>

                    <div class="input-field">
                        <FaUser className='icon' />
                        <input type="email" placeholder="Email" name="email" autoComplete='off' />
                    </div>

                    <div class="input-field">
                        <FaLock className='icon' />
                        <input type="password" placeholder="Password" name="password" autoComplete='off' />
                    </div>

                    <br />

                    <h6>Couldn't remember the password ?<NavLink to='/'> Click Here?</NavLink></h6>

                    <br />

                    <button type="submit" className="btn">Log In</button>

                    <br />

                    <GoogleButton onClick={signInUsingGoogle} style={{ backgroundColor: "#11d7ff", fontFamily: "Poppins, sans-serif" }} />
                </form>

            </div>
        </>
    )
}

export default Login