import { MdBookmarkAdd, MdShare } from 'react-icons/md'

import moment from 'moment'
import { NavLink } from 'react-router-dom'

import './card.scss'

const Card = (props) => {

    const blog = props.value

    return (
        <NavLink className="container" to='/blog'>

            <div className="content">

                <div className="img_name_date">

                    <div className="img">
                        <img src="../../../public/images/vite.svg" alt="myimg" />
                    </div>

                    <div className="name">
                        <p> {blog.author} </p>
                    </div>

                    <div className="date">
                        <p> {moment().format('DD/MM/YYYY')} </p>
                    </div>

                </div>

                <div className="content-overview">

                    <div className="content-heading">
                        <h2>{blog.blogTitle}</h2>
                    </div>

                    <div className="content-short">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti nobis tempore iste velit libero illo necessitatibus! Aut necessitatibus totam eum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum nobis quo consectetur asperiores id dignissimos vitae omnis.....
                    </div>

                </div>

                <div className="readtime_icons">

                    <div className="content_about">

                        {/* topics' container */}
                        <div className="topic-container">

                            <div className="topic-icon">
                                {blog.type}
                            </div>

                            <div className="topic-icon readtime">
                                11 min read
                            </div>

                        </div>

                        {/* Topics Moreabout */}
                        <div className="topic_moreabout">

                            <div className="icons">
                                <MdBookmarkAdd className="icon"/>
                                <MdShare className="icon"/>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <div className="image">
                <img src="../../../public/images/sample.webp" alt="" />
            </div>

        </NavLink>
    )
}

export default Card