import { onValue, ref } from "firebase/database"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { database } from "./firebase"
import About2 from "./components/about/About2"
import Card from "./components/card/Card"
import Navbar from "./components/navbar/Navbar"
import About from "./components/about/About"
import Latest from "./components/sidebar/Latest"
import CodioShare from "./components/editorSidebar/CodioShare"
import SidebarFooter from "./components/sidebar/SidebarFooter"
import './styles/profile.scss'
import Dummy from "./components/card/Dummy"



const Profile = () => {

  const { uid } = useParams()

  const [type, setType] = useState('')
  const [count, setCount] = useState(0)


  const [authorBlog, setAuthorBlog] = useState([])


  useEffect ( () => {

    onValue(ref(database, 'blogs/'), (snapshot) => {
      if(snapshot){
        const all = snapshot.val()
        const blogs = Object.values(all)
        let temp = []
        blogs.map((blog) => {
          if (blog.authorid == uid) {
            temp.push(blog)
          }
        })
        setAuthorBlog(temp.reverse())
        setCount(temp.length)
      }
    })
  }, [])

  useEffect ( () => {

    onValue(ref(database, 'blogs/'), (snapshot) => {
      if(snapshot){
        const all = snapshot.val()
        const blogs = Object.values(all)
        let temp = []
        blogs.map((blog) => {
          if (blog.authorid == uid) {
            temp.push(blog)
          }
        })
        setAuthorBlog(temp.reverse())
        setCount(temp.length)
      }
    })

  }, [uid])

  // useEffect(() => {

  //   if(type == 'bookmarked')
  //   {
  //     onValue(ref(database, 'blogs/'), (snapshot) => {
  //       if(snapshot)
  //       {
  //         const all = snapshot.val()
  //         const blogs = Object.values(all)
  //         let temp = []
  //         blogs.map((blog) => {
  //           if (blog.authorid == uid) {
  //             temp.push(blog)
  //           }
  //         })
  //         setAuthorBlog(temp)
  //         setCount(temp.length)
  //       }
  //     })

  //     const bookRef = ref(database, 'users/' + uid + '/bookMarkedBlogs')

  //     let bmarr = []
  //     onValue(bookRef, (snapshot) => {
  //       if(snapshot)
  //         bmarr = snapshot.val()
  //     })

  //     console.log( 'the bookmarked array snapshot : ' + bmarr)

  //     let bids = []
  //     for(const key in bmarr)
  //       bids.push(key)

  //     console.log( 'printing the bids : ' + bids)

  //     let temp = authorBlog
  //     // console.log('Now the authorBlog is : ' + authorBlog)

  //     let ans = []
  //     bids.map( (id) => {
  //       temp.map( (blog) => {
  //         if(blog.bid == id)
  //           ans.push(blog)
  //       })
  //     })

  //     console.log(ans)
  //     setAuthorBlog(ans)
  //     setCount(ans.length)
  //   }

  //   else
  //   {

  //   }

  // }, [type])


  return (
    <>
      <section className="profile">
        <Navbar />

        <div className="about_sidebar">

          <div className="name_heading">

            <About2 value={uid} />

            <div className="select_box">

              <select name="category" id="category" value={type} onChange={(e) => setType(e.target.value)}>

                <option value="all_blogs" defaultValue>All Blogs</option>
                <option value="likedblogs" >Liked Blogs</option>
                <option value="bookmarked">Bookmarked Blogs</option>

              </select>

              <h4> {count} {(count > 1) ? ' blogs' : ' blog'} </h4>

            </div>

            <div className="cards_container">
              {authorBlog.length > 0 && authorBlog.map((blog) => (<Card className='card' key={blog} value={blog} />))}
              {authorBlog.length === 0 && <Dummy message={'No Written Blogs'} />}
            </div>
          </div>


          <div className="profile_sidebar">
            <Latest />
            <CodioShare />
            <SidebarFooter />
          </div>

        </div>
      </section>
    </>
  )
}

export default Profile