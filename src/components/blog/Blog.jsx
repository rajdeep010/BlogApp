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

    }, [likecount, commentcount, bid])


    const addComment = () => {

        const obj = blogContext.makeComment(comment, userId)
        const cmntID = obj.commentID

        const commentListRef = ref(database, 'blogs/' + bid + '/comments/' + cmntID)

        // comment pushed
        set(commentListRef, obj)

        // comment count update
        // for that first retrive the previous value
        const dbRef = ref(database, 'blogs/' + bid + '/metrics')

        let cmnts = 0
        onValue(dbRef, (snapshot) => {
            cmnts = snapshot.val().cmnts
        })

        update(dbRef, {
            cmnts: cmnts + 1
        })

        setComment('')
        // console.log('comment pushed successfully')
    }

    const addLike = () => {

        const dbRef = ref(database, 'users/' + userId + '/likedBlogs')

        let res
        onValue(dbRef, (snapshot) => {
            res = snapshot.val()
        })

        if (res === null) {
            const obj = {
                'time': moment().format('DD/MM/YYYY HH:mm:ss')
            }

            const newRef = ref(database, 'users/' + userId + '/likedBlogs/' + bid)
            set(newRef, obj)
            setIsLiked(false)

            // update the like count
            const likeCountRef = ref(database, 'blogs/' + bid + '/metrics/')

            let likes = 0
            onValue(likeCountRef, (snapshot) => {
                likes = snapshot.val().likes
            })

            update(likeCountRef, {
                likes: likes + 1
            })
        }

        else {
            // check whether the current userID already present or not
            // console.log(res)

            let found = false
            for (const key in res) {
                // console.log(key)
                if (key === bid) {
                    found = true
                    break
                }
            }

            // already liked blog  => remove from list
            if (found === true) {
                const newRef = ref(database, 'users/' + userId + '/likedBlogs/' + bid)
                remove(newRef)

                // like count update
                const likeCountRef = ref(database, 'blogs/' + bid + '/metrics/')

                let likes = 0
                onValue(likeCountRef, (snapshot) => {
                    likes = snapshot.val().likes
                })

                if (likes > 0) {
                    update(likeCountRef, {
                        likes: likes - 1
                    })

                    setIsLiked(false)
                }
            }

            // not liked blog => now set as liked
            else {
                const obj = {
                    'time': moment().format('DD/MM/YYYY HH:mm:ss')
                }

                const newRef = ref(database, 'users/' + userId + '/likedBlogs/' + bid)
                set(newRef, obj)

                setIsLiked(true)

                // update the like count
                const likeCountRef = ref(database, 'blogs/' + bid + '/metrics/')

                let likes = 0
                onValue(likeCountRef, (snapshot) => {
                    likes = snapshot.val().likes
                })

                update(likeCountRef, {
                    likes: likes + 1
                })
            }
        }

        // console.log('This blog with blog id : ' + bid + ' has the isliked status : ' + isLiked)
    }


    const inner = (str) => {
        return <div className='post_content' dangerouslySetInnerHTML={{__html: str}}></div>
    }

    return (
        <>
            <section className='full-blog'>

                <section className="blog-box">
                    {/* <section className="header-img"><img src="../../../public/gucci.jpeg" alt="" /></section> */}
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