import { NavLink } from 'react-router-dom'
import { MdMail } from 'react-icons/md'

import './about.scss'

import Button from '../button/Button'
import { useEffect, useState } from 'react'
import { onValue, ref } from 'firebase/database'
import { database } from '../../firebase'

const About = (props) => {

    const [user, setUser] = useState({
        'name': '',
        'about': '',
        'blogs': '',
        'email': ''
    })

    const [authorId, setAuthorId] = useState('')

    const bid = props.value

    useEffect(() => {
        onValue(ref(database, ('blogs/' + bid)), (snapshot) => {
            setAuthorId(snapshot.val().authorid)
        })

        onValue(ref(database, ('users/' + authorId + '/details/')), snapshot => {
            const value = snapshot.val()

            const name = value.name
            const about = value.about
            const email = value.email
            const blogs = value.blogCount
            setUser({ name, about, blogs, email })
        })
    }, [])

    useEffect(() => {
        onValue(ref(database, ('blogs/' + bid)), (snapshot) => {
            setAuthorId(snapshot.val().authorid)
        })

        onValue(ref(database, ('users/' + authorId + '/details/')), snapshot => {
            const value = snapshot.val()
            const name = value.name
            const about = value.about
            const email = value.email
            const blogs = value.blogCount
            setUser({ name, about, blogs, email })
        })
    }, [authorId])


    return (
        <>
            <section className="about-me">

                <div className="myimg">
                    <img src="../../../public/me.jpg" alt="myimg" />
                </div>

                <div className="name-post">
                    <h2>{user.name}, <small>{user.blogs} {(user.blogs > 1) ? ' blogs' : ' blog'}</small></h2>
                    <p>{user.about}</p>
                </div>

                <div className="buttons">

                    {/* <Button value={'FOLLOW'} /> */}

                    <NavLink to={'/mailto:'+user.email} className='button'>
                        <MdMail className='icon' />
                    </NavLink>
                </div>

            </section>
        </>
    )
}

export default About