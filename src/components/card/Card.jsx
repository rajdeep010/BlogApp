import { MdBookmarkAdd, MdShare } from 'react-icons/md'

import { NavLink } from 'react-router-dom'

import './card.scss'

const Card = (props) => {

    const blog = props.value
    let content = blog.blogContent

    if (content.length > 400)
        content = content.substr(0, 400)

    if (content[content.length - 1] == ' ')
        content[content.length - 1] = ''

    content += '...'

    const bid = blog.bid

    return (
        <NavLink className="container" to={'/blog/' + bid}>
            <div className="content">
                <div className="img_name_date">
                    <div className="img"><img src="../../../public/images/vite.svg" alt="myimg" /></div>
                    <div className="name"><p> {blog.authorName} </p></div>
                    <div className="date"><p> {blog.date} </p></div>
                </div>

                <div className="content-overview">
                    <div className="content-heading"><h2>{blog.blogTitle}</h2></div>
                    <div className="content-short">{content}</div>
                </div>

                <div className="readtime_icons">
                    <div className="content_about">

                        <div className="topic-container">
                            <div className="topic-icon">{blog.type}</div>
                            <div className="topic-icon readtime">{blog.readtime}</div>
                        </div>

                        <div className="topic_moreabout">
                            <div className="icons"><MdBookmarkAdd className="icon" /><MdShare className="icon" /></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="image"><img src="../../../public/images/sample.webp" alt="" /></div>
        </NavLink>
    )
}

export default Card