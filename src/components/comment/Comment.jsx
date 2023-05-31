import { FiMoreVertical } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import { onValue, ref, remove, update } from "firebase/database";
import { database } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import ReactTimeago from 'react-timeago'



const Comment = (props) => {

    const authContext = useContext(AuthContext)
    const userID = authContext.userId

    const [commentor, setCommentor] = useState({
        'name': '',
        'about': '',
        'avatarURL': '',
    })

    const [edit, setEdit] = useState(false)

    const user = props.value
    const comment = user.comment
    const authorId = user.author
    const cmntID = user.commentID
    const bid = props.blogID
    const time = user.time


    useEffect(() => {
        onValue(ref(database, ('users/' + authorId + '/details/')), (snapshot) => {
            if (snapshot) {
                const details = snapshot.val()
                const name = details.name
                const about = details.about
                const avatarURL = details.avatarURL
                setCommentor({ name, about, avatarURL })
            }
        })
    }, [])

    useEffect(() => {
        onValue(ref(database, ('users/' + authorId + '/details/')), (snapshot) => {
            const details = snapshot.val()
            const name = details.name
            const about = details.about
            const avatarURL = details.avatarURL
            setCommentor({ name, about, avatarURL })
        })
    }, [authorId, edit])


    const handleToggle = () => {
        setEdit((edit == true) ? false : true)
    }

    const handleCommentDelete = () => {

        // Comment deleted succesfully
        const commentRef = ref(database, 'blogs/' + bid + '/comments/' + cmntID)
        remove(commentRef)
            .then(() => {
                // comment count update
                const dbRef = ref(database, 'blogs/' + bid + '/metrics')

                let cmnts = 0
                onValue(dbRef, (snapshot) => {
                    if (snapshot)
                        cmnts = snapshot.val().cmnts
                })

                if (cmnts > 0) {
                    update(dbRef, {
                        cmnts: cmnts - 1
                    })
                }
            })
            .catch((err) => {
                console.log('Error while deleting')
            })
    }


    return (
        <>
            <div className="cmnt">

                <div className="person-img">
                    {commentor.avatarURL && <img src={commentor.avatarURL} alt="dp" />}
                    {!commentor.avatarURL && <img src="../../public/images/user.png" alt="img" />}
                </div>

                <div className="details_edit_cmnt">

                    <div className="details_edit">

                        <div className="details">
                            <div className="details_name">
                                <p> {commentor.name} </p>
                            </div>
                            <div className="details_about">
                                <p> {commentor.about} </p>
                            </div>
                        </div>

                        <div className="timeago_edit">
                            <div className="ago">
                            <p><ReactTimeago date={time} locale='en-US' /></p>
                            </div>

                            {authContext.userId && authContext.isAuthenticated && (userID === authorId) && <div className="edit" onClick={handleToggle}>

                                <div className="three_dot_icon">
                                    <FiMoreVertical />
                                </div>

                                {edit && <div className="edit_option">
                                    <div className="option" onClick={handleCommentDelete}>
                                        Delete
                                    </div>
                                    <div className="option">
                                        Copy Link
                                    </div>
                                </div>}
                            </div>}

                        </div>
                    </div>

                    <div className="comment">
                        {comment}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Comment