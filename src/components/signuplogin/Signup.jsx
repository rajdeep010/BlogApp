import { useContext } from 'react'
import './signup.scss'
import GoogleButton from 'react-google-button'
import { AuthContext } from '../../context/AuthContext'
import { FaUser, FaLock, FaPen, FaKey } from 'react-icons/fa'




const Signup = () => {

    const authCtx = useContext(AuthContext)

    return (
        <>
            <div className="signin_container box">

                <form action="/signin" className="sign-in-form" method="post">
                    <h2 className='heading'>SIGN <span>UP</span></h2>

                    <div class="input-field">
                        <FaPen className='icon' />
                        <input type="text" placeholder="Full Name" name="name" autoComplete='off' />
                    </div>

                    <div class="input-field">
                        <FaUser className='icon' />
                        <input type="email" placeholder="Email" name="email" autoComplete='off' />
                    </div>

                    <div class="input-field">
                        <FaLock className='icon' />
                        <input type="password" placeholder="Password" name="password" autoComplete='off' />
                    </div>

                    <div class="input-field">
                        <FaKey className='icon' />
                        <input type="password" placeholder="Confirm Password" name="conpassword" autoComplete='off' />
                    </div>

                    <br />
                    <button type="submit" className="btn">Sign Up <span class="fas fa-angle-double-right"></span></button>

                    <br />

                    <GoogleButton style={{backgroundColor: "#11d7ff", fontFamily: "Poppins, sans-serif"}}/>
                </form>

            </div>
        </>
    )
}

export default Signup