import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import '../../styles/likecmnt.scss'
import { BlogContext } from "../../context/BlogContext"
import { notifier } from "../../utils/notify"
import { FiSend } from "react-icons/fi"




const Input = (props) => {

    const bid = props.value

    const authCtx = useContext(AuthContext)
    const blogContext = useContext(BlogContext)

    const userId = authCtx.userId

    const [comment, setComment] = useState('')

    const addComment = () => {
        if(comment.trim().length === 0){
            notifier('Please write something !!', 'info')
            return
        }

        const obj = blogContext.makeComment(comment, userId)
        const cmntID = obj.commentID
        blogContext.addComment(bid, cmntID, setComment, obj)
    }

    return (
        <>
            {authCtx.user && authCtx.userId && authCtx.user.emailVerified && <div className="cmntbox">
                <div className="comment-input-box"><input type="text" className="cmnt-input" placeholder="Write Your Comment..." value={comment} onChange={(e) => setComment(e.target.value)} /></div>
                <div className="comment-submit-button" onClick={addComment} ><button className="like-box-icons"> <FiSend /> </button></div>
            </div>}
        </>
    )
}

export default Input