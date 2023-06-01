import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { onValue, ref } from 'firebase/database'
import { database } from '../../firebase'
import Card from '../card/Card'
import Dummy from '../card/Dummy'
import '../../styles/profile.scss'
import uniqid from 'uniqid'

const Filter = () => {

    const authCtx = useContext(AuthContext)
    const uid = authCtx.userId

    const [count, setCount] = useState(0)
    const [type, setType] = useState('')

    const [allBlogs, setAllBlogs] = useState([])
    const [lkBlogs, setLikedBlogs] = useState([])
    const [bbBlogs, setBookmarkedBlogs] = useState([])

    const [isAll, setIsAll] = useState(true)
    const [isLike, setIsLike] = useState(false)
    const [isBook, setIsBook] = useState(false)


    useEffect(() => {
        onValue(ref(database, 'blogs/'), (snapshot) => {
            if (snapshot) {
                const all = snapshot.val()
                const blogs = Object.values(all)

                const temp = []
                blogs.map((blog) => {
                    if (blog.authorid === uid)
                        temp.push(blog)
                })

                setAllBlogs(temp.reverse())
                setCount(temp.length)
            }
        })

        // --------- find out the liked blogs --------
        const lbref = ref(database, 'users/' + uid + '/likedBlogs')
        let temp = []

        onValue(lbref, (snapshot) => {
            if(snapshot){
                const res = snapshot.val()

                for(const key in res){
                    temp.push(key)
                }
            }
        })

        const likedBlogsRef = ref(database, 'blogs/')
        let likedBlogs = []
        onValue(likedBlogsRef, (snapshot) => {
            if(snapshot)
            {
                const res = snapshot.val()

                for(const key in res){
                    // console.log(res[key])

                    if(temp.includes(key))
                        likedBlogs.push(res[key])
                }
                setLikedBlogs(likedBlogs.reverse())
            }
        })
        // --------------------------------------------


        // --------- find out the Bookmarked blogs --------
        const bbref = ref(database, 'users/' + uid + '/bookMarkedBlogs')
        let btemp = []

        onValue(bbref, (snapshot) => {
            if(snapshot){
                const res = snapshot.val()

                for(const key in res){
                    btemp.push(key)
                }
            }
        })

        const bookmarkedBlogsRef = ref(database, 'blogs/')
        let bookmarkedBlogs = []
        onValue(bookmarkedBlogsRef, (snapshot) => {
            if(snapshot)
            {
                const res = snapshot.val()

                for(const key in res){
                    // console.log(res[key])

                    if(temp.includes(key))
                        bookmarkedBlogs.push(res[key])
                }
                setBookmarkedBlogs(bookmarkedBlogs.reverse())
            }
        })
        // --------------------------------------------
    },[])

    useEffect(() => {
        onValue(ref(database, 'blogs/'), (snapshot) => {
            if (snapshot) {
                const all = snapshot.val()
                const blogs = Object.values(all)

                const temp = []
                blogs.map((blog) => {
                    if (blog.authorid === uid)
                        temp.push(blog)
                })

                setAllBlogs(temp.reverse())
            }
        })

        // --------- find out the liked blogs --------
        const lbref = ref(database, 'users/' + uid + '/likedBlogs')
        let temp = []

        onValue(lbref, (snapshot) => {
            if(snapshot){
                const res = snapshot.val()

                for(const key in res){
                    temp.push(key)
                }
            }
        })

        const likedBlogsRef = ref(database, 'blogs/')
        let likedBlogs = []
        onValue(likedBlogsRef, (snapshot) => {
            if(snapshot)
            {
                const res = snapshot.val()

                for(const key in res){
                    // console.log(res[key])

                    if(temp.includes(key))
                        likedBlogs.push(res[key])
                }
                setLikedBlogs(likedBlogs.reverse())
            }
        })

        // --------------------------------------------


        // --------- find out the Bookmarked blogs --------
        const bbref = ref(database, 'users/' + uid + '/bookMarkedBlogs')
        let btemp = []
        onValue(bbref, (snapshot) => {
            if(snapshot){
                const res = snapshot.val()
                for(const key in res){
                    btemp.push(key)
                }
            }
        })

        const bookmarkedBlogsRef = ref(database, 'blogs/')
        let blogs = []
        onValue(bookmarkedBlogsRef, (snapshot) => {
            if(snapshot){
                const res = snapshot.val()
                for(const key in res){
                    if(btemp.includes(key))
                        blogs.push(res[key])
                }
                setBookmarkedBlogs(blogs.reverse())
            }
        })
        // --------------------------------------------
    },[type])

    const handleTypeUpdate = (e) => {
        setType(e.target.value)

        if(e.target.value === 'all_blogs'){
            setIsAll(true)
            setIsLike(false)
            setIsBook(false)
            setCount(allBlogs.length)
        }

        else if(e.target.value === 'likedblogs'){
            setIsAll(false)
            setIsLike(true)
            setIsBook(false)
            setCount(lkBlogs.length)
        }

        else if(e.target.value === 'bookmarked'){
            setIsAll(false)
            setIsLike(false)
            setIsBook(true)
            setCount(bbBlogs.length)
        }
    }

    return (
        <>
            <div className="select_box">
                <select name="category" id="category" value={type} onChange={handleTypeUpdate}>
                    <option value="all_blogs" defaultValue>Written Blogs</option>
                    <option value="likedblogs" >Liked Blogs</option>
                    <option value="bookmarked">Bookmarked Blogs</option>
                </select>
                <h4> {count} {(count > 1) ? ' blogs' : ' blog'} </h4>
            </div>

            <div className="cards_container">
                {isAll && ( (allBlogs.length > 0) ? (allBlogs.map((blog) => (<Card className='card' key={uniqid()} value={blog} />))) : (<Dummy message={'No Written Blogs'} />) ) }
                {isLike && ( (lkBlogs.length > 0) ? (lkBlogs.map((blog) => (<Card className='card' key={uniqid()} value={blog} />))) : (<Dummy message={'No Liked Blogs'} />) ) }
                {isBook && ( (bbBlogs.length > 0) ? (bbBlogs.map((blog) => (<Card className='card' key={uniqid()} value={blog} />))) : (<Dummy message={'No Bookmarked Blogs'} />) ) }

                
                {/* {isLike && lkBlogs.length > 0 && lkBlogs.map((blog) => (<Card className='card' key={uniqid()} value={blog} />)) }
                {isBook && bbBlogs.length > 0 && bbBlogs.map((blog) => (<Card className='card' key={uniqid()} value={blog} />)) } */}

                {/* {!isAll && ! allBlogs.length === 0 && <Dummy message={'No Written Blogs'} />} */}
            </div>
        </>
    )
}

export default Filter