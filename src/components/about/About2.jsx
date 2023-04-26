import { useEffect, useState } from 'react'
import './about2.scss'
import { onValue, ref } from 'firebase/database'
import { database } from '../../firebase'

const About2 = (props) => {

    const uid = props.value

    const [user, setUser] = useState({
        'name': '',
        'about': '',
        'blogCount': ''
    })

    useEffect(() => {
        onValue(ref(database, ('users/' + uid + '/details/')), (snapshot) => {
            if(snapshot){
                const details = snapshot.val()
                const obj = {
                    'name': details.name,
                    'about': details.about,
                    'blogCount': details.blogCount
                }

                setUser(obj)
            }
        })
    }, [])

    return (
        <>
            <section className="author_about">

                <h2> {user.name} </h2>
                <p className='short_details'> {user.about} </p>
                <p className='short_details' > {user.blogCount} {(user.blogCount > 1) ? ' blogs' : ' blog'} </p>

            </section>
        </>
    )
}

export default About2