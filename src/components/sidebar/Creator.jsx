import { useContext, useEffect, useState } from 'react'
import Button from '../button/Button'
import './creator.scss'
import { onValue, ref } from 'firebase/database'
import { database } from '../../firebase'
import { AuthContext } from '../../context/AuthContext'
import { NavLink } from 'react-router-dom'

const Creator = (props) => {

    const [following, setFollowing] = useState([])
    // const [str, setStr] = useState('')

    const authCtx = useContext(AuthContext)
    const myid = authCtx.userId

    const detail = props.value

    const name = detail.name
    const about = detail.about
    const id = detail.authorId

    const path = 'users/' + id

    // const setCorrectButtonContent = (str, strArray) => {
    //     for (var j = 0; j < strArray.length; j++) {
    //         if (strArray[j].match(str)){
    //             setStr('FOLLOW')
    //             return;
    //         }
    //     }

    //     setStr('UNFOLLOW')
    // }


    // useEffect(() => {
    //     onValue(ref(database, ('users/' + myid)), (snapshot) => {
    //         if (snapshot) {
    //             setFollowing(snapshot.val().following.split(','))
    //             // setCorrectButtonContent(id, following)
    //         }
    //     })
    // }, [])

    // useEffect(() => {
    //     onValue(ref(database, ('users/' + myid)), (snapshot) => {
    //         if (snapshot) {
    //             setFollowing(snapshot.val().following.split(','))
    //             setCorrectButtonContent(id, following)
    //         }
    //     })
    // }, [str])

    return (
        <>
            <NavLink className="creator_info" to={path}>

                <div className="creator_image">
                    <img src="../../../public/images/vite.svg" alt="creator" />
                </div>

                <div className="creator_details">
                    <div className="creator_name"><p>{name}</p></div>
                    <div className="creator_about">{about}</div>
                </div>

                {/* For not using any recommendation algo, not giving any following feature as of now */}

                {/* <div className="follow_button">
                    <Button value={str} />
                </div> */}

            </NavLink>
        </>
    )
}

export default Creator