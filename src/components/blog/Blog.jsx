import './blog.scss'
import '../../styles/likecmnt.scss'
import { CiHeart, CiChat1, CiShare2, CiLocationArrow1 } from "react-icons/ci";
import moment from 'moment'
import { useContext, useEffect, useState } from 'react'
import { onValue, ref, remove, set, update } from 'firebase/database'
import { database } from '../../firebase'
import Comment from '../comment/Comment';
import { AuthContext } from '../../context/AuthContext';
import { BlogContext } from '../../context/BlogContext';
import { VscHeartFilled, VscHeart, VscComment } from "react-icons/vsc";
import 'react-quill/dist/quill.snow.css';
import { BiBookmarkPlus, BiBookmarkMinus } from "react-icons/bi";
// BiBookmarkPlus



const Blog = (props) => {

    const bid = props.value

    const authCtx = useContext(AuthContext)
    const blogContext = useContext(BlogContext)
    const userId = authCtx.userId

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [likecount, setLikeCount] = useState(0)
    const [commentcount, setCommentCount] = useState(0)
    const [comment, setComment] = useState('')
    const [blogComment, setBlogComment] = useState([])
    const [isLiked, setIsLiked] = useState(false)
    const [poster, setPoster] = useState('')
    const [isPoster, setIsPoster] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(false)


    useEffect(() => {

        onValue(ref(database, ('blogs/' + bid)), (snapshot) => {
            if (snapshot) {
                // fetch the current blog
                const blog = snapshot.val()

                // set the details of the blog
                // title, like, comment count, contents
                setTitle(blog.blogTitle)
                setContent(blog.blogHTML)
                setLikeCount(blog.metrics.likes)
                setCommentCount(blog.metrics.cmnts)
                setPoster(blog.posterURL)

                setIsPoster((blog.posterURL === undefined || blog.posterURL === '') ? false : true)

                // and update all the comments on the blog
                if (blog.comments === null || blog.comments === undefined) {
                    setBlogComment([])
                }

                else {
                    const temp = Object.values(blog.comments)
                    setBlogComment(temp)
                }
            }
        })


        const dbRef = ref(database, 'users/' + userId + '/likedBlogs')        

        onValue(dbRef, (snapshot) => {
            const res = snapshot.val()

            if (res === null)
                setIsLiked(false)

            else {
                let found = false

                for (const key in res) {
                    // console.log(key)
                    if (key === bid) {
                        found = true
                        break
                    }
                }

                setIsLiked((found === true) ? false : true)
            }
        })


        const bookmarkRef = ref(database, 'users/' + userId + '/bookMarkedBlogs')

        onValue(bookmarkRef, (snapshot) => {
            const res = snapshot.val()

            if (res === null)
                setIsBookmarked(false)

            else {
                let found = false

                for (const key in res) {
                    if (key === bid) {
                        found = true
                        break
                    }
                }

                setIsBookmarked((found === true) ? true : false)
            }
        })

    }, [])

    useEffect(() => {
        onValue(ref(database, ('blogs/' + bid)), (snapshot) => {
            if (snapshot) {
                // fetch the current blog
                const blog = snapshot.val()

                // set the details of the blog
                // title, like, comment count, contents
                setTitle(blog.blogTitle)
                setContent(blog.blogHTML)
                setLikeCount(blog.metrics.likes)
                setCommentCount(blog.metrics.cmnts)
                setPoster(blog.posterURL)

                setIsPoster((blog.posterURL === undefined || blog.posterURL === '') ? false : true)

                // and update all the comments on the blog
                if (blog.comments === null || blog.comments === undefined) {
                    setBlogComment([])
                }

                else {
                    const temp = Object.values(blog.comments)
                    setBlogComment(temp)
                }
            }
        })


        const dbRef = ref(database, 'users/' + userId + '/likedBlogs')

        onValue(dbRef, (snapshot) => {
            const res = snapshot.val()

            if (res === null)
                setIsLiked(false)

            else {
                let found = false

                for (const key in res) {
                    // console.log(key)
                    if (key === bid) {
                        found = true
                        break
                    }
                }
                setIsLiked((found === true) ? false : true)
            }
        })


        const bookmarkRef = ref(database, 'users/' + userId + '/bookMarkedBlogs')

        onValue(bookmarkRef, (snapshot) => {
            const res = snapshot.val()

            if (res === null)
                setIsBookmarked(false)

            else {
                let found = false

                for (const key in res) {
                    if (key === bid) {
                        found = true
                        break
                    }
                }

                setIsBookmarked((found === true) ? true : false)
            }
        })

    }, [likecount, commentcount, bid, isBookmarked])


    const addComment = () => {
        const obj = blogContext.makeComment(comment, userId)
        const cmntID = obj.commentID
        blogContext.addComment(bid, cmntID, setComment, obj)
    }

    const addLike = () => {
        blogContext.addLike(userId, bid, setIsLiked)
    }

    const handleBookMark = () => {
        blogContext.handleBookMark(userId, bid, setIsBookmarked)
    }


    const inner = (str) => {
        return <div className='post_content' dangerouslySetInnerHTML={{ __html: str }}></div>
    }

    return (
        <>
            <section className='full-blog'>

                <section className="blog-box">

                    <section className="header-img">
                        {isPoster && <img src={poster} alt="" />}
                    </section>

                    <div className="blog_heading"><h1>{title}</h1></div>
                    <div className="blog_actual_content">
                        {inner(content)}
                    </div>
                </section>

                <section className="reaction">
                    <section className="lc-container">
                        <div className="icons">

                            <button className="like-box-icons" onClick={addLike}>
                                {isLiked && <div className="each-icon">
                                    <VscHeart className="icon" />
                                </div>}

                                {!isLiked && <div className="each-icon">
                                    <VscHeartFilled className="icon" color='red' />
                                </div>}

                                <div className="count">{likecount}</div>
                            </button>

                            <button className="like-box-icons">
                                <div className="each-icon"><VscComment className="icon" /></div>
                                <div className="count">{commentcount}</div>
                            </button>

                            <button className="like-box-icons" onClick={handleBookMark}>
                                {isBookmarked && <div className="each-icon">
                                    <BiBookmarkMinus className="icon" />
                                </div>}

                                {!isBookmarked && <div className="each-icon">
                                    <BiBookmarkPlus className="icon" />
                                </div>}
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

                                {blogComment.map((each) => (
                                    <Comment value={each} blogID={bid} key={each} />
                                ))}

                            </div>
                        </div>
                    </section>
                </section>
            </section>
        </>
    )
}

export default Blog