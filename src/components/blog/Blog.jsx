import '../../styles/blog.scss'
import '../../styles/likecmnt.scss'
import { useContext, useEffect, useState } from 'react'
import { onValue, ref, remove, update } from 'firebase/database'
import { database } from '../../firebase'
import { AuthContext } from '../../context/AuthContext';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer } from 'react-toastify';
import { notifier } from '../../utils/notify';
import { FiMoreVertical } from 'react-icons/fi';
import { storage } from '../../firebase'
import { ref as ref_storage, deleteObject } from 'firebase/storage'
import { useNavigate } from 'react-router-dom'
import AllComments from '../comment/AllComments'
import LikeCmnt from '../likecmnt/LikeCmnt'
import ShareModal from '../modal/ShareModal'
import { RiShareForwardFill } from "react-icons/ri";



const Blog = (props) => {

    const bid = props.value
    const temp = 'https://codioshare.web.app/blog/' + bid


    const authCtx = useContext(AuthContext)
    const userId = authCtx.userId

    const [title, setTitle] = useState('')
    const [authorid, setAuthorid] = useState('')
    const [content, setContent] = useState('')
    const [poster, setPoster] = useState('')
    const [isPoster, setIsPoster] = useState(false)
    const [deleteOption, setDeleteOption] = useState(false)

    const [shareModal, setShareModal] = useState(false)


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
                setPoster(blog.posterURL)

                setIsPoster((blog.posterURL === undefined || blog.posterURL === '') ? false : true)
            }
        })
    }, [])


    useEffect(() => {
        if (shareModal)
            document.body.style.overflowY = 'hidden'

        else
            document.body.style.overflowY = 'visible'

    }, [shareModal])



    const handleDeleteBlog = () => {
        // delete the blog
        const dbref = ref(database, 'blogs/' + bid)

        remove(dbref)
            .then(() => {
                notifier('Comment deleted', 'success')
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
            .catch((err) => {
                notifier('Something went wrong', 'error')
            })
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
                            <FiMoreVertical className='vertical'/>
                        </div>}

                        {deleteOption && authCtx.user.emailVerified && <button className="btn" onClick={handleDeleteBlog}>
                            Delete Blog
                        </button>}

                        <RiShareForwardFill className='share_icon' onClick={() => setShareModal(true)} />
                        {shareModal && <ShareModal setShareModal={setShareModal} shareModal={shareModal} temp={temp} />}

                    </div>

                    <div className="main_content">
                        <section className="header-img">{isPoster && <img src={poster} alt="" />}</section>
                        <div className="blog_title"><h1>{title}</h1></div>
                        <div className="blog_actual_content">{inner(content)}</div>
                    </div>

                </section>

                <section className="reaction">
                    <section className="lc-container">
                        {authCtx.user && authCtx.user.emailVerified && authCtx.userId && <LikeCmnt bid={bid} />}
                        <AllComments value={bid} />
                    </section>
                </section>
            </section>

            <ToastContainer />
        </>
    )
}

export default Blog