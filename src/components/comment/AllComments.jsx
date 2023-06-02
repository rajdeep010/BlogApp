import { useEffect, useState } from "react"
import '../../styles/likecmnt.scss'
import { onValue, ref } from "firebase/database"
import { database } from "../../firebase"
import Dummy from "../card/Dummy"
import uniqid from 'uniqid'
import Comment from "./Comment"
import Input from "./Input"



const AllComments = (props) => {

    const bid = props.value
    const [blogComments, setBlogComments] = useState([])

    useEffect(() => {
        const commentRef = ref(database, 'blogs/' + bid + '/comments/')
        onValue(commentRef, (snapshot) => {
            if(snapshot)
            {
                const temp = Object.values(snapshot.val())
                setBlogComments(temp)
            }
        })
    }, [])

    return (
        <>
            <div className="comment-container">

                <Input value={bid}/>

                <div className="comments">
                    {(blogComments.length > 0) && blogComments.map((each) => (
                        <Comment value={each} blogID={bid} key={uniqid()} />
                    ))}
                </div>

                <div className="dummy_comments">
                    {blogComments.length === 0 && <Dummy message={'No Comments Till now'} />}
                </div>
            </div>
        </>
    )
}

export default AllComments