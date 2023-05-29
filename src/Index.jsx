import Card from "./components/card/Card"
import Sidebar from "./components/sidebar/Sidebar"
import Navbar from "./components/navbar/Navbar"
import './index.scss'
import { useEffect, useState } from "react"
import { onValue, ref } from "firebase/database"
import { database } from "./firebase"
import { IoMdSearch, IoMdClose } from "react-icons/io";
import Dummy from "./components/card/Dummy"


const App = () => {

  const [arr, setArr] = useState([])

  const [searchInput, setSearchInput] = useState("")
  const [visibleSearchBar, setVisibleSearchBar] = useState(false)

  const [allBlogs, setAllBlogs] = useState('All Blogs')
  const [searchByTitle, setSearchByTitle] = useState('Search by Title...')


  const toggleSearchBar = () => {
    setSearchInput('');
    setVisibleSearchBar(!visibleSearchBar);
  }

  useEffect(() => {
    let blogs = []
    onValue(ref(database, 'blogs/'), (snapshot) => {
      if (snapshot) {
        const all = snapshot.val()
        blogs = Object.values(all)
        setArr(blogs.reverse())
      }
    })
  }, [])

  useEffect(() => {

    let temp = []
    onValue(ref(database, 'blogs/'), (snapshot) => {
      if (snapshot) {
        const all = snapshot.val()
        temp = Object.values(all)
        setArr(temp.reverse())
      }
    })

    if (temp) {
      let blogs = []

      temp.filter((blog) => {
        if (searchInput.trim() === '') {
          blogs.push(blog)
        }
        else if (blog.blogTitle.toLowerCase().includes(searchInput.trim().toLowerCase())) {
          blogs.push(blog)
        }
      })

      setArr(blogs)
    }
  }, [searchInput])


  return (
    <>
      <Navbar />

      <section className="app_container">

        {/* search section */}
        <div className="search_and_cards_container">

          <div className="search_bar">
            <h1>{!visibleSearchBar ? allBlogs : searchByTitle} {!visibleSearchBar && <IoMdSearch className='searchIcon' onClick={toggleSearchBar} />}</h1>

            {visibleSearchBar && <input type="text" placeholder="Search by title..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />}
            {visibleSearchBar && <IoMdClose className='searchIcon closeIcon' onClick={toggleSearchBar} />}
          </div>

          <div className="cards_container">
            {arr.length > 0 && arr.map((blog) => (<Card className='card' key={blog} value={blog} />))}
            {arr.length === 0 && <Dummy className='card' key={123} message={'No Blogs Till Now'} />}
          </div>

        </div>

        <div>
          <Sidebar className='sidebar' />
        </div>
      </section>
    </>
  )
}

export default App