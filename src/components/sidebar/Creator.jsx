import { useContext, useEffect, useState } from 'react'
import Button from '../button/Button'
import './creator.scss'
import { onValue, ref } from 'firebase/database'
import { database } from '../../firebase'
import { AuthContext } from '../../context/AuthContext'
import { render } from 'react-dom'

const Creator = (props) => {

    const [following, setFollowing] = useState([])
    const [str, setStr] = useState('')

    const authCtx = useContext(AuthContext)
    // console.log(authCtx)
    const myid = authCtx.userId

    const detail = props.value

    const name = detail.name
    const about = detail.about
    const id = detail.authorId

    const searchStringInArray = (str, strArray) => {
        // console.log(str)

        for (var j = 0; j < strArray.length; j++) {
            if (strArray[j].match(str)){
                return true;
            }
        }

        console.log('not found : '   + str + ' ' + name)
        return false;
    }

    useEffect(() => {
        onValue(ref(database, ('users/' + myid)), (snapshot) => {

            if (snapshot) {
                console.log(snapshot.val().following.split(','))
                setFollowing(snapshot.val().following.split(','))
            }
        })
    }, [])

    return (
        <>
            <div className="creator_info">

                <div className="creator_image">
                    <img src="../../../public/images/vite.svg" alt="creator" />
                </div>

                <div className="creator_details">
                    <div className="creator_name"><p>{name}</p></div>
                    <div className="creator_about">{about}</div>
                </div>

                <div className="follow_button">

                    <Button value={searchStringInArray(id, following) === false ? 'FOLLOW' : 'UNFOLLOW' } />

                </div>

            </div>
        </>
    )
}

export default Creator