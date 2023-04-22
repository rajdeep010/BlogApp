import Card from "./components/card/Card"
import Sidebar from "./components/sidebar/Sidebar"
import Navbar from "./components/navbar/Navbar"
import './index.css'
import { useEffect, useState } from "react"
import { onValue, ref } from "firebase/database"
import { database } from "./firebase"

const App = () => {

  const [arr, setArr] = useState([])

  useEffect(() => {
    let blogs = []
    onValue(ref(database, 'blogs/'), (snapshot) => {
      if (snapshot) {
        const all = snapshot.val()
        blogs = Object.values(all)
      }
    })
    // console.log(blogs)
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