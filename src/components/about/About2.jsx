import { useEffect, useState } from 'react'
import './about2.scss'
import { onValue, ref } from 'firebase/database'
import { database } from '../../firebase'
import { FaUserEdit } from "react-icons/fa";



const About2 = (props) => {

    const uid = props.value

    const [user, setUser] = useState({
        'name': '',
        'about': '',
        'blogCount': ''
    })

    useEffect(() => {
        onValue(ref(database, ('users/' + uid + '/details/')), (snapshot) => {
            if (snapshot) {
                const details = snapshot.val()
                const obj = {
                    'name': details.name,
                    'about': details.about,
                    'blogCount': (details.blogCount == NaN) ? 0 : details.blogCount
                }

                setUser(obj)
            }
        })
    }, [])

    return (
        <>
            <section className="author_about">

                <div className="author_details">
                    <h2> {user.name}, <small>{user.blogCount} {(user.blogCount > 1) ? ' blogs' : ' blog'}</small></h2>
                    <p className='short_details'> {user.about} </p>
                </div>

                <div className="bookmarked_and_edit_buttons">
                    <FaUserEdit className='about2_icon'/>
                </div>

            </section>
        </>
    )
}

export default About2