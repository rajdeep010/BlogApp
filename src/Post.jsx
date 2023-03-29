import Navbar from "./components/navbar/Navbar"

import Blog from "./components/blog/Blog"
import About from "./components/about/About"
import Latest from "./components/sidebar/Latest"
import CodioShare from "./components/editorSidebar/CodioShare"

import './post.scss'

const Post = () => {
    return (
        <>
            <section className="post-container">
                <Navbar />
                <div className="post-page-element">
                    <Blog />

                    <div className="post-sidebar">
                        <About />
                        <Latest />
                        <CodioShare/>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Post