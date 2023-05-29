import { NavLink } from 'react-router-dom'
import './card.scss'
import { useEffect, useState } from 'react'
import ReactTimeago from 'react-timeago'
import { onValue, ref } from 'firebase/database'
import { database } from '../../firebase'



const Card = (props) => {

    const blog = props.value

    const authorID = blog.authorid

    const [avatar, setAvatar] = useState(null)
    const [authorName, setAuthorName] = useState('')

    const time = blog.date
    const poster = blog.posterURL
    const isPoster = (poster === undefined || poster === '') ? false : true

    let content = blog.blogContent

    if (content.length > 400)
        content = content.substr(0, 400)

    if (content[content.length - 1] == ' ')
        content[content.length - 1] = ''

    content += '...'

    const bid = blog.bid

    useEffect(() => {
        const dbRef = ref(database, 'users/' + authorID + '/details')

        onValue(dbRef, (snapshot) => {
            // console.log(snapshot.val())

            if (snapshot){
                setAvatar(snapshot.val().avatarURL)
                setAuthorName(snapshot.val().name)
            }
        })

    }, [])


    return (
        <NavLink className="container" to={'/blog/' + bid}>

            <div className="content">

                <div className="img_name_date">

                    <div className="img">
                        {avatar && <img src={avatar} alt="myimg" className='card_icon' />}
                        {!avatar && <img src="../../../public/images/vite.svg" alt="myimg" className='card_icon'/>}
                    </div>

                    <div className="name"><p> {authorName}, </p></div>

                    <div className="date">
                        <p><ReactTimeago date={time} locale='en-US' /></p>
                    </div>
                </div>

                <div className="content-overview">
                    <div className="content-heading"><h2>{blog.blogTitle}</h2></div>
                    <div className="content-short">{content}</div>
                </div>

                <div className="readtime_icons">
                    <div className="content_about">

                        <div className="topic-container">
                            <div className="topic-icon">{blog.type}</div>
                            <div className="topic-icon readtime">{blog.readtime}</div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="image">
                {isPoster && <img src={poster} alt="poster" />}
            </div>
        </NavLink>
    )
}

export default Card