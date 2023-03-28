import './signup.scss'
import { FaUser, FaLock } from 'react-icons/fa'


const Login = () => {
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

                    <button type="submit" className="btn">Log In <span class="fas fa-angle-double-right"></span></button>

                </form>

            </div>
        </>
    )
}

export default Login