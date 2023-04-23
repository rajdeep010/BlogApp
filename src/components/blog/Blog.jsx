import './blog.scss'
import '../../styles/likecmnt.scss'
import { CiHeart, CiChat1, CiShare2, CiLocationArrow1 } from "react-icons/ci";
import moment from 'moment'
import { useEffect, useState } from 'react'
import { onValue, ref, set, push } from 'firebase/database'
import { database } from '../../firebase'

const Blog = (props) => {

    const bid = props.value

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [likes, setLikes] = useState(0)
    const [comments, setComments] = useState(0)

    const [comment, setComment] = useState('')

    useEffect(() => {
        onValue(ref(database, ('blogs/' + bid)), (snapshot) => {
            if (snapshot) {
                const blog = snapshot.val()
                // console.log(blog)
                setTitle(blog.blogTitle)
                setContent(blog.blogContent)
                setLikes(blog.metrics.likes)
                setComments(blog.metrics.cmnts)
            }
        })
    }, [])

    useEffect(() => {
        onValue(ref(database, ('blogs/' + bid)), (snapshot) => {
            if (snapshot) {
                const blog = snapshot.val()
                // console.log(blog)
                setTitle(blog.blogTitle)
                setContent(blog.blogContent)
                setLikes(blog.metrics.likes)
                setComments(blog.metrics.cmnts)
            }
        })
    }, [likes, comments, bid])


    const addComment = () => {
        const commentListRef = ref(database, 'blogs/' + bid + '/comments/')
        set(push(commentListRef), comment)

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
                                <div className="count">{likes}</div>
                            </button>

                            <button className="like-box-icons">
                                <div className="each-icon"><CiChat1 className="icon" /></div>
                                <div className="count">{comments}</div>
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
                                <div className="cmnt">
                                    <div className="person-img"><img src="../../public/vite.svg" alt="img" /></div>
                                    <div className="person-cmnt">Your apporach is very good for this problem..</div>
                                </div>

                                <div className="cmnt">
                                    <div className="person-img"><img src="../../public/vite.svg" alt="img" /></div>
                                    <div className="person-cmnt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores alias placeat accusantium. Et ratione adipisci, ipsa est repellendus, eligendi, veritatis nemo laborum error similique sunt neque vero voluptatem reprehenderit nulla.</div>
                                </div>

                                <div className="cmnt">
                                    <div className="person-img"><img src="../../public/vite.svg" alt="img" /></div>
                                    <div className="person-cmnt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi libero ea ullam iure! Quod, aspernatur a libero numquam dolorem consequatur itaque recusandae nulla distinctio error animi! Veniam maxime quae doloribus eos recusandae nemo, alias est consectetur iusto aliquam sed molestias voluptates voluptatem libero hic rerum soluta ut, sunt assumenda ipsam. Aliquam corporis nemo sequi architecto voluptates, ullam nam vel enim accusamus officia inventore, dolore repudiandae non ratione, quaerat provident autem.</div>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            </section>



        </>
    )
}

export default Blog