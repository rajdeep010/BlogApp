import { useEffect, useState } from 'react'
import Button from '../button/Button'
import './creator.scss'
import { onValue, ref } from 'firebase/database'
import { database } from '../../firebase'

const Creator = (props) => {

    const [following, setFollowing] = useState([])

    const detail = props.value

    const name = detail.name
    const about = detail.about
    const id = detail.authorId
    
    // console.log(id)

    useEffect(() => {
        onValue(ref(database, ('users/' + id)), (snapshot) => {
            // console.log(snapshot.val().following)

            if(snapshot){
                setFollowing(snapshot.val().following)
            }
        })
    },[])

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
                    <Button value={'FOLLOW'} />
                </div>

            </div>
        </>
    )
}

export default Creator