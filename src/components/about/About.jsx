import { NavLink } from 'react-router-dom'
import { MdMail } from 'react-icons/md'
import '../../styles/about.scss'
import { useEffect, useState } from 'react'
import { onValue, ref } from 'firebase/database'
import { database } from '../../firebase'



const About = (props) => {

    const [user, setUser] = useState({
        'name': '',
        'about': '',
        'blogs': '',
        'email': '',
        'avatarURL': '',
    })

    const mailurl = 'https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to='

    const [authorId, setAuthorId] = useState('')

    const bid = props.value

    useEffect(() => {
        onValue(ref(database, ('blogs/' + bid)), (snapshot) => {
            setAuthorId(snapshot.val().authorid)
        })

        onValue(ref(database, ('users/' + authorId + '/details/')), snapshot => {
            if (snapshot.val()) {
                const value = snapshot.val()

                const name = value.name
                const about = value.about
                const email = value.email
                const blogs = value.blogCount
                const avatarURL = value.avatarURL
                setUser({name, about, blogs, email, avatarURL })
            }
        })
    }, [])

    useEffect(() => {
        onValue(ref(database, ('blogs/' + bid)), (snapshot) => {
            if (snapshot)
                setAuthorId(snapshot.val().authorid)
        })

        onValue(ref(database, ('users/' + authorId + '/details/')), (snapshot) => {
            if (snapshot.val()) {
                const value = snapshot.val()
                const name = value.name
                const about = value.about
                const email = value.email
                const blogs = value.blogCount
                const avatarURL = value.avatarURL
                setUser({name, about, blogs, email, avatarURL })
            }
        })
    }, [authorId])


    return (
        <>
            <section className="about-me">

                <div className="myimg">
                    {user.avatarURL && <img src={user.avatarURL} alt="myimg" />}
                    {!user.avatarURL && <img src="../../../public/images/user.png" alt="myimg" />}
                </div>

                <div className="name-post">
                    <h2>{user.name}, <small>{user.blogs} {(user.blogs > 1) ? ' blogs' : ' blog'}</small></h2>
                    <p>{user.about}</p>
                </div>

                <div className="buttons">

                    {/* <Button value={'FOLLOW'} /> */}

                    <NavLink target='_blank' to={mailurl + user.email} className='button'>
                        <MdMail className='icon' />
                    </NavLink>
                </div>

            </section>
        </>
    )
}

export default About