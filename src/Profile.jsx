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

const Profile = () => {

  const { uid } = useParams()
  // console.log(uid)

  const [authorBlog, setAuthorBlog] = useState([])

  useEffect(() => {
    onValue(ref(database, ('blogs/')), (snapshot) => {
      if (snapshot) {
        // console.log(snapshot.val())
        const all = snapshot.val()
        const blogs = Object.values(all)

        let temp = []

        blogs.map((blog) => {
          // console.log(blog)
          console.log(blog.authorid)

          if (blog.authorid == uid) {
            console.log('hello ' + uid)
            temp.push(blog)
          }
        })

        console.log(temp)
        setAuthorBlog(temp)
      }
    })
  }, [])

  useEffect(() => {
    onValue(ref(database, ('blogs/')), (snapshot) => {
      if (snapshot) {
        // console.log(snapshot.val())
        const all = snapshot.val()
        const blogs = Object.values(all)

        let temp = []

        blogs.map((blog) => {
          if (blog.authorid == uid)
            temp.push(blog)
        })

        setAuthorBlog(temp)
      }
    })
  }, [uid])

  return (
    <>
      <section className="profile">
        <Navbar />

        <div className="about_sidebar">

          <div className="name_heading">
            <About2 value={uid}/>
            <div className="cards_container">{authorBlog.map((blog) => (<Card className='card' key={blog} value={blog} />))}</div>
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