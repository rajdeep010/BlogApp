
import './signup.scss'

import { FaUser, FaLock } from 'react-icons/fa'

const Signup = () => {

    return (
        <>
            <section className="wrapper">

                <div className="signup-login-buttons">
                    <button className='btn loginbtn'>LOGIN</button>
                    <button className='btn signupbtn'>SIGNUP</button>
                </div>


                <div className="signup-login">

                    <div className="signup_container box">

                        {/* <!-- *********----------- LOG IN PART ----------********** --> */}

                        <form action="/login" className="log-in-form" method="post">

                            <h2 className='heading'>LOGIN</h2>

                            <div class="input-field">
                                <FaUser className='icon' />
                                <input type="email" placeholder="Email" name="email" />
                            </div>

                            <div class="input-field">
                                <FaLock className='icon' />
                                <input type="password" placeholder="Password" name="password" />
                            </div>

                            <button type="submit" className="btn">Sign In <span class="fas fa-angle-double-right"></span></button>

                        </form>

                    </div>

                    <div className="login_container box">

                    </div>

                </div>


            </section>
        </>
    )
}

export default Signup