import Navbar from '../navbar/Navbar'

import Login from './Login'
import Signup from './Signup'

import './signup.scss'

const Registration = () => {
  return (
    <>
      <section className="wrapper">

        <div className="signup-login-buttons">
          <button className='btn'>LOGIN</button>
          <button className='btn'>SIGNUP</button>
        </div>

        <div className="signup-login">
          {/* <Login /> */}
          <Signup />
        </div>

      </section>
    </>
  )
}

export default Registration