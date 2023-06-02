import { useContext, useEffect, useState } from 'react'
import '../../styles/likecmnt.scss'
import { VscHeartFilled, VscHeart, VscComment } from "react-icons/vsc";
import { BiBookmarkPlus, BiBookmarkMinus } from "react-icons/bi";
import { FacebookShareButton, LinkedinShareButton, WhatsappShareButton } from 'react-share'
import { FaFacebook, FaWhatsapp, FaLinkedin } from 'react-icons/fa';
import { notifier } from '../../utils/notify';
import { AuthContext } from '../../context/AuthContext';
import { BlogContext } from '../../context/BlogContext';
import { ref, onValue } from 'firebase/database';
import { database } from '../../firebase';
import { RiShareForwardFill } from "react-icons/ri";
import ShareModal from '../modal/ShareModal';


const LikeCmnt = ({ bid }) => {

    const temp = 'https://codioshare.web.app/blog/' + bid

    const authCtx = useContext(AuthContext)
    const blogContext = useContext(BlogContext)

    const userId = authCtx.userId

    const [likeCount, setLikeCount] = useState(0)
    const [commentCount, setCommentCount] = useState(0)


    const [isLiked, setIsLiked] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(false)

    const [shareModal, setShareModal] = useState(false)


    useEffect(() => {

        onValue(ref(database, ('blogs/' + bid)), (snapshot) => {
            if (snapshot) {
                const blog = snapshot.val()
                setLikeCount(blog.metrics.likes)
                setCommentCount(blog.metrics.cmnts)
            }
        })

        const dbRef = ref(database, 'users/' + userId + '/likedBlogs')

        onValue(dbRef, (snapshot) => {

            if (snapshot) {
                let found = false
                const res = snapshot.val()

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
        if(shareModal)
            document.body.style.overflowY = 'hidden'
        
        else
            document.body.style.overflowY = 'visible'
    
    }, [shareModal])


    useEffect(() => {

        const dbRef = ref(database, 'users/' + userId + '/likedBlogs')

        onValue(dbRef, (snapshot) => {

            if (snapshot) {
                let found = false
                const res = snapshot.val()

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

    }, [likeCount, commentCount])



    const addLike = () => {
        blogContext.addLike(userId, bid, setIsLiked)
    }


    const handleBookMark = () => {
        blogContext.handleBookMark(userId, bid, setIsBookmarked)

        if (isBookmarked === false)
            notifier('Added to BookMarked', 'success')

        else
            notifier('Removed from BookMarked', 'error')
    }

    return (
        <>
            <div className="icons">
                <button className="like-box-icons" onClick={addLike}>
                    {!isLiked && <div className="each-icon">
                        <VscHeart className="icon" />
                    </div>}

                    {isLiked && <div className="each-icon">
                        <VscHeartFilled className="icon" color='red' />
                    </div>}

                    <div className="count">{likeCount}</div>
                </button>

                <button className="like-box-icons">
                    <div className="each-icon"><VscComment className="icon" /></div>
                    <div className="count">{commentCount}</div>
                </button>

                <button className="like-box-icons" onClick={handleBookMark}>
                    {isBookmarked && <div className="each-icon">
                        <BiBookmarkMinus className="icon" />
                    </div>}

                    {!isBookmarked && <div className="each-icon">
                        <BiBookmarkPlus className="icon" />
                    </div>}
                </button>

            </div>
        </>
    )
}

export default LikeCmnt