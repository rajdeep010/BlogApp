import { NavLink } from 'react-router-dom'
import { MdMail } from 'react-icons/md'

import './about.scss'

import Button from '../button/Button'

const About = () => {
  return (
    <>
        <section className="about-me">

            <div className="myimg">
                <img src="../../../public/me.jpg" alt="myimg" />
            </div>

            <div className="name-post">
                <h2>RAJDEEP MALLICK</h2>
                <p>35 Followers</p>
                <p>Pupil on Codeforces</p>
            </div>

            <div className="buttons">

                <Button value={'FOLLOW'} />

                <NavLink to='/mailto:rajdeepmallick999@gmail.com' className='btn'>
                        <MdMail className='icon'/>
                </NavLink>
            </div>

        </section>
    </>
  )
}

export default About