import Card from "./components/card/Card"
import Sidebar from "./components/sidebar/Sidebar"

import Navbar from "./components/navbar/Navbar"

import './index.css'

import { useContext, useEffect, useState } from "react"

import { BlogContext } from "./context/BlogContext"

const App = () => {

  const blogCtx = useContext(BlogContext)

  const [arr, setArr] = useState([])

  useEffect(() => {
    const blogs = blogCtx.giveBlogs()
    setArr(blogs)
  }, [])

  return (
    <>
      <Navbar />

      <section className="app_container">
        <div className="cards_container">{arr.map((blog) => (<Card className='card' value={blog} />))}</div>

        <Sidebar className='sidebar' />
      </section>
    </>
  )
}

export default App