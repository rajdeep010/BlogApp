import { NavLink } from 'react-router-dom'
import '../../styles/latestblog.scss'
import { useEffect, useState } from 'react'
import { onValue, ref } from 'firebase/database'
import { database } from '../../firebase'

const Latestblog = (props) => {

    const detail = props.value

    const authorID = detail.authorid
    const [avatar, setAvatar] = useState(null)
    const [authorName, setAuthorName] = useState('')

    // console.log(detail)

    // const authorName = detail.authorName
    const blogTitle = detail.blogTitle
    const readtime = detail.readtime
    const bid = detail.bid

    useEffect(() => {

        const dbRef = ref(database, 'users/' + authorID + '/details')

        onValue(dbRef, (snapshot) => {
            if (snapshot)
                setAvatar(snapshot.val().avatarURL)
                setAuthorName(snapshot.val().name)
        })

    }, [])


    return (
        <>
            <NavLink to={'/blog/' + bid} style={{ 'textDecoration': 'none' }} >

                <div className="blog">

                    <div className="img_name">

                        <div className="writer_img">
                            {avatar && <img src={avatar} alt="myimg" className='card_icon' />}
                            {!avatar && <img src="../../../images/user.png" alt="myimg" className='card_icon' />}
                        </div>

                        <div className="writer_name">
                            <p>{authorName}, &nbsp;{readtime}</p>
                        </div>

                    </div>

                    <div className="blog_title">
                        <p>{blogTitle}</p>
                    </div>

                </div>
            </NavLink>

        </>
    )
}

export default Latestblog