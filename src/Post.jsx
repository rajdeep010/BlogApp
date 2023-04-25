import Navbar from "./components/navbar/Navbar"
import Blog from "./components/blog/Blog"
import About from "./components/about/About"
import Latest from "./components/sidebar/Latest"
import CodioShare from "./components/editorSidebar/CodioShare"
import { useParams } from "react-router-dom"

import './post.scss'
import { useEffect, useState } from "react"

const Post = () => {

    const [blogId, setBlogId] = useState('')
    
    const {bid} = useParams()

    useEffect(()=> {
        setBlogId(bid)
    }, [])

    useEffect(()=> {
        setBlogId(bid)
    }, [bid])

    return (
        <>
            <section className="post-container">
                <Navbar />
                <div className="post-page-element">
                    <Blog value={bid}/>

                    <div className="post-sidebar">
                        <About value={bid}/>
                        <Latest />
                        <CodioShare/>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Post