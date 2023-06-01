import './blog.scss'
import '../../styles/likecmnt.scss'
import { useContext, useEffect, useState } from 'react'
import { onValue, ref, remove, set, update } from 'firebase/database'
import { database } from '../../firebase'
import Comment from '../comment/Comment';
import { AuthContext } from '../../context/AuthContext';
import { BlogContext } from '../../context/BlogContext';
import { VscHeartFilled, VscHeart, VscComment } from "react-icons/vsc";
import 'react-quill/dist/quill.snow.css';
import { BiBookmarkPlus, BiBookmarkMinus } from "react-icons/bi";
import Dummy from '../card/Dummy';
import { ToastContainer } from 'react-toastify';
import { notifier } from '../../utils/notify';
import { FacebookShareButton, LinkedinShareButton } from 'react-share'
import { FaFacebook, FaWhatsapp, FaLinkedin } from 'react-icons/fa';
import { FiMoreVertical, FiSend } from 'react-icons/fi';
import { redirect } from '../../utils/login-utils'
import { storage } from '../../firebase'
import { ref as ref_storage, deleteObject } from 'firebase/storage'
import { useNavigate } from 'react-router-dom'



const Blog = (props) => {

    const bid = props.value

    const authCtx = useContext(AuthContext)
    const blogContext = useContext(BlogContext)
    const userId = authCtx.userId
    const url = window.location.href


    const [title, setTitle] = useState('')
    const [authorid, setAuthorid] = useState('')
    const [content, setContent] = useState('')
    const [likecount, setLikeCount] = useState(0)
    const [commentcount, setCommentCount] = useState(0)
    const [comment, setComment] = useState('')
    const [blogComment, setBlogComment] = useState([])
    const [isLiked, setIsLiked] = useState(false)
    const [poster, setPoster] = useState('')
    const [isPoster, setIsPoster] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [shareModal, setShareModal] = useState(false)
    const [writer, setWriter] = useState('')
    const [deleteOption, setDeleteOption] = useState(false)


    const temp = 'https://medium.com'

    const navigate = useNavigate()
    const goToProfile = () => {
        navigate('/users/' + userId)
    }


    useEffect(() => {

        onValue(ref(database, ('blogs/' + bid)), (snapshot) => {
            if (snapshot) {
                // fetch the current blog
                const blog = snapshot.val()

                // set the details of the blog
                // title, like, comment count, contents
                setTitle(blog.blogTitle)
                setAuthorid(blog.authorid)
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

                const name = blogContext.blogWriter(bid)
                setWriter(name)

                // console.log(name)
            }
        })


        const dbRef = ref(database, 'users/' + userId + '/likedBlogs')

        onValue(dbRef, (snapshot) => {
            const res = snapshot.val()

            if (res === null || res === undefined)
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

                setIsLiked((found === true) ? true : false)
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
                setAuthorid(blog.authorid)
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

                const name = blogContext.blogWriter(bid)
                setWriter(name)
            }
        })


        const dbRef = ref(database, 'users/' + userId + '/likedBlogs')

        onValue(dbRef, (snapshot) => {
            const res = snapshot.val()

            if (res === null || res === undefined)
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
                setIsLiked((found === true) ? true : false)
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

    useEffect(() => {
        if (shareModal)
            document.body.style.overflowY = 'hidden'

        else
            document.body.style.overflowY = 'visible'

    }, [shareModal])


    const addComment = () => {
        if(comment.trim().length === 0){
            notifier('Please write something !!', 'info')
            return
        }

        const obj = blogContext.makeComment(comment, userId)
        const cmntID = obj.commentID
        blogContext.addComment(bid, cmntID, setComment, obj)
    }


    const addLike = () => {
        blogContext.addLike(userId, bid, setIsLiked)
    }


    const handleDeleteBlog = () => {
        // delete the blog
        const dbref = ref(database, 'blogs/' + bid)

        remove(dbref)
            .then(() => {
                const blogCountRef = ref(database, 'users/' + userId + '/details')

                let blogs = 0
                onValue(blogCountRef, (snapshot) => {
                    if (snapshot) {
                        blogs = snapshot.val().blogCount
                    }
                })

                if (blogs > 0) {
                    update(blogCountRef, {
                        blogCount: blogs - 1
                    })
                        .then(() => {
                            const likeRef = ref(database, 'users/' + userId + '/likedBlogs/' + bid)
                            remove(likeRef)
                                .then(() => {
                                    // console.log('Removed from liked blogs')
                                })
                                .catch((err) => {
                                    // console.log('Error while removing from liked blogs')
                                })

                            const bookmarkRef = ref(database, 'users/' + userId + '/bookMarkedBlogs/' + bid)
                            remove(bookmarkRef)
                                .then(() => {
                                    // console.log('Removed from bookmarked blogs')
                                })
                                .catch((err) => {
                                    // console.log('Error while removing from bookmarked blogs')
                                })


                            const posterRef = ref_storage(storage, 'posters/' + bid)
                            deleteObject(posterRef)
                                .then(() => {
                                    // console.log('File Deletion Successful')
                                }).catch((err) => {
                                    // console.log('Error in poster delete')
                                });

                            notifier('Blog Deleted Successfully', 'success')
                            setTimeout(goToProfile, 4000);
                        })
                        .catch(() => {
                            console.log('Count update Problem')
                        })
                }
            })
    }

    const handleBookMark = () => {
        blogContext.handleBookMark(userId, bid, setIsBookmarked)

        if (isBookmarked === false)
            notifier('Added to BookMarked', 'success')

        else
            notifier('Removed from BookMarked', 'error')
    }

    const handleWhatsappShare = () => {
        const text = `_🔥🔥 Check out this blog, title :"_ ${title}_" written by "_${writer}_ "on CODIO❤️. Link :_ ${url}`
        const share = `whatsapp://send?text=${text}`
        window.open(share)
    }


    const inner = (str) => {
        return <div className='post_content' dangerouslySetInnerHTML={{ __html: str }}></div>
    }

    return (
        <>
            <section className='full-blog'>

                <section className="blog-box">

                    <div className="option_icon">

                        {userId && authCtx.user && authCtx.user.emailVerified && (userId === authorid) && <div className="icon" onClick={() => setDeleteOption(!deleteOption)}>
                            <FiMoreVertical />
                        </div>}

                        {deleteOption && authCtx.user.emailVerified &&  <button className="btn" onClick={handleDeleteBlog}>
                            Delete Blog
                        </button>}

                    </div>

                    <div className="main_content">

                        <section className="header-img">
                            {isPoster && <img src={poster} alt="" />}
                        </section>

                        <div className="blog_title">
                            <h1>{title}</h1>
                        </div>

                        <div className="blog_actual_content">
                            {inner(content)}
                        </div>
                    </div>

                </section>

                <section className="reaction">

                    <section className="lc-container">

                        {authCtx.user && authCtx.user.emailVerified  && authCtx.userId && <div className="icons">

                            <button className="like-box-icons" onClick={addLike}>
                                {!isLiked && <div className="each-icon">
                                    <VscHeart className="icon" />
                                </div>}

                                {isLiked && <div className="each-icon">
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

                            <button className='share_icons'>
                                <div className="each-icon">
                                    <FacebookShareButton className='icon' url={temp} quote={'Check out the blog'} hashtag={'#codio'} >
                                        <FaFacebook />
                                    </FacebookShareButton>

                                    <div className="icon" onClick={handleWhatsappShare}>
                                        <FaWhatsapp />
                                    </div>

                                    <LinkedinShareButton className='icon' title={'CODIO'} summary={'Check out this blog on CODIO'} source={'CODIO'} url={temp}>
                                        <FaLinkedin round={true} />
                                    </LinkedinShareButton>
                                </div>
                            </button>
                        </div>
                        }


                        {/* Comment writing part */}
                        <div className="comment-container">

                            {authCtx.user && authCtx.userId && authCtx.user.emailVerified  &&  <div className="cmntbox">
                                <div className="comment-input-box"><input type="text" className="cmnt-input" placeholder="Write Your Comment..." value={comment} onChange={(e) => setComment(e.target.value)} /></div>
                                <div className="comment-submit-button" onClick={addComment} ><button className="like-box-icons"> <FiSend /> </button></div>
                            </div>}

                            {/* Comment more comments */}
                            <div className="comments">

                                {blogComment.length > 0 && blogComment.map((each) => (
                                    <Comment value={each} blogID={bid} key={each} />
                                ))}
                            </div>

                            <div className="dummy_comments">
                                {blogComment.length === 0 && <Dummy message={'No Comments Till now'} />}
                            </div>
                        </div>
                    </section>
                </section>
            </section>

            <ToastContainer />
        </>
    )
}

export default Blog