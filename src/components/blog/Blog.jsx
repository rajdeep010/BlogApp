import './blog.scss'
import '../../styles/likecmnt.scss'
import { CiHeart, CiChat1, CiShare2, CiLocationArrow1 } from "react-icons/ci";
import moment from 'moment'
import { FiMoreVertical } from "react-icons/fi";
import { useContext, useEffect, useState } from 'react'
import { onValue, ref, set, push } from 'firebase/database'
import { database } from '../../firebase'
import Comment from '../comment/Comment';
import { AuthContext } from '../../context/AuthContext';

const Blog = (props) => {

    const bid = props.value

    const authCtx = useContext(AuthContext)
    const userId = authCtx.userId

    const [commentor, setCommentor] = useState({
        'name': '',
        'about': ''
    })

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [likecount, setLikeCount] = useState(0)
    const [commentcount, setCommentCount] = useState(0)

    const [comment, setComment] = useState('')

    const [blogComment, setBlogComment] = useState([])

    useEffect(() => {
        onValue(ref(database, ('blogs/' + bid)), (snapshot) => {
            if (snapshot) {
                // fetch the current blog
                const blog = snapshot.val()
                // console.log(blog)

                // set the details of the blog
                // title, like, comment count, contents
                setTitle(blog.blogTitle)
                setContent(blog.blogContent)
                setLikeCount(blog.metrics.likes)
                setCommentCount(blog.metrics.cmnts)

                // and update all the comments on the blog

                console.log(blog.comments)
            }
        })
    }, [])

    useEffect(() => {
        onValue(ref(database, ('blogs/' + bid)), (snapshot) => {
            if (snapshot) {
                // fetch the current blog
                const blog = snapshot.val()
                // console.log(blog)

                // set the details of the blog
                // title, like, comment count, contents
                setTitle(blog.blogTitle)
                setContent(blog.blogContent)
                setLikeCount(blog.metrics.likes)
                setCommentCount(blog.metrics.cmnts)

                // and update all the comments on the blog
            }
        })
    }, [likecount, commentcount, bid])

    const updateAllComments = (id) => {
        onValue(ref(database, ('users/'+id+'/details/')), (snapshot) => {
            if(snapshot){
                // console.log(snapshot.val())
                const user = snapshot.val()

                const res = {
                    'name': user.name,
                    'about': user.about,
                    'comment': comment
                }

                setCommentor(res)
            }
        })
    }


    const addComment = () => {
        // console.log(moment().format('DD/MM/YYYY HH:mm:ss'))

        const obj = {
            'comment': comment,
            'time': moment().format('DD/MM/YYYY HH:mm:ss'),
            'author': userId
        }
        const commentListRef = ref(database, 'blogs/' + bid + '/comments/')
        set(push(commentListRef), obj)
        setComment('')
        console.log('comment pushed successfully')
    }

    return (
        <>
            <section className='full-blog'>

                <section className="blog-box">
                    <section className="header-img"><img src="../../../public/gucci.jpeg" alt="" /></section>
                    <div className="blog-heading"><h1>{title}</h1></div>
                    <div className="blog-actual-content">{content}</div>
                </section>

                <section className="reaction">
                    <section className="lc-container">
                        <div className="icons">
                            <button className="like-box-icons" >
                                <div className="each-icon"><CiHeart className="icon" /></div>
                                <div className="count">{likecount}</div>
                            </button>

                            <button className="like-box-icons">
                                <div className="each-icon"><CiChat1 className="icon" /></div>
                                <div className="count">{commentcount}</div>
                            </button>

                            <button className="like-box-icons"><div className="each-icon"><CiShare2 className="icon" /></div></button>
                        </div>


                        {/* Comment writing part */}
                        <div className="comment-container">

                            <div className="cmntbox">
                                <div className="comment-input-box"><input type="text" className="cmnt-input" placeholder="Write Your Comment..." value={comment} onChange={(e) => setComment(e.target.value)} /></div>
                                <div className="comment-submit-button" onClick={addComment} ><button className="like-box-icons"> <CiLocationArrow1 /> </button></div>
                            </div>

                            {/* Comment more comments */}
                            <div className="comments">

                                <Comment value={commentor}/>

                                {/* <Comment/>

                                <Comment/> */}
                            </div>
                        </div>
                    </section>
                </section>
            </section>



        </>
    )
}

export default Blog