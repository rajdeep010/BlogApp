import Navbar from "./components/navbar/Navbar"
import Blog from "./components/blog/Blog"
import About from "./components/about/About"
import Latest from "./components/sidebar/Latest"
import CodioShare from "./components/editorSidebar/CodioShare"
import { useParams } from "react-router-dom"
import './styles/post.scss'
import { useEffect, useState } from "react"
// import About2 from './components/about/About2'


const Post = () => {

    const [blogId, setBlogId] = useState('')

    const { bid } = useParams()

    useEffect(() => {
        setBlogId(bid)
    }, [])

    useEffect(() => {
        setBlogId(bid)
    }, [bid])


    return (
        <>
            <section className="post-container">

                {/* <Navbar /> */}

                <div className="post-page-element">

                    <div className="page_blog">
                        <Blog value={bid} />
                    </div>

                    <div className="post-sidebar">

                        <div className="element">
                            <About value={bid} />
                        </div>

                        <div className="element">
                            <Latest />
                        </div>

                        <div className="element">
                            <CodioShare />
                        </div>
                    </div>

                </div>
            </section>

        </>
    )
}

export default Post