import { useEffect, useState } from 'react'
import './creator.scss'
import { NavLink } from 'react-router-dom'
import { onValue, ref } from 'firebase/database'
import { database } from '../../firebase'

const Creator = (props) => {

    const [avatar, setAvatar] = useState(null)

    const detail = props.value

    const name = detail.name
    const about = detail.about
    const id = detail.authorId

    const path = 'users/' + id

    useEffect(() => {
        const dbRef = ref(database, 'users/' + id + '/details')

        onValue(dbRef, (snapshot) => {
            if (snapshot) {
                setAvatar(snapshot.val().avatarURL)
            }
        })
    }, [])

    return (
        <>
            <NavLink className="creator_info" to={path}>

                <div className="creator_image">
                    {avatar && <img src={avatar} alt="myimg" className='card_icon' />}
                    {!avatar && <img src="../../../public/images/user.png" alt="myimg" className='card_icon' />}
                </div>

                <div className="creator_details">
                    <div className="creator_name"><p>{name}</p></div>
                    <div className="creator_about">{about}</div>
                </div>

            </NavLink>
        </>
    )
}

export default Creator