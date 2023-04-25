import { FiMoreVertical } from "react-icons/fi";
import moment from "moment";
import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { database } from "../../firebase";

const Comment = (props) => {

    const [commentor, setCommentor] = useState({
        'name': '',
        'about': ''
    })

    const user = props.value
    const comment = user.comment
    const authorId = user.author

    useEffect(() => {
        onValue(ref(database, ('users/' + authorId + '/details/')), (snapshot) => {
            const details = snapshot.val()
            const name = details.name
            const about = details.about
            setCommentor({name, about})
        })
    }, [])

    useEffect(() => {
        onValue(ref(database, ('users/' + authorId + '/details/')), (snapshot) => {
            const details = snapshot.val()
            const name = details.name
            const about = details.about
            setCommentor({name, about})
        })
    }, [authorId])

    return (
        <>
            <div className="cmnt">
                <div className="person-img">
                    <img src="../../public/vite.svg" alt="img" />
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
                                18 hours ago
                            </div>
                            <div className="edit">
                                <FiMoreVertical />
                            </div>
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