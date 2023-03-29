
import './signup.scss'

import { FaUser, FaLock, FaPen, FaKey } from 'react-icons/fa'

const Signup = () => {

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

                    <button type="submit" className="btn">Sign Up <span class="fas fa-angle-double-right"></span></button>
                </form>

            </div>
        </>
    )
}

export default Signup