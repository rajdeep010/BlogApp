import { NavLink } from 'react-router-dom'

import './latestblog.scss'

const Latestblog = (props) => {

    const detail = props.value

    // console.log(detail)

    const authorName = detail.authorName
    const blogTitle = detail.blogTitle
    const readtime = detail.readtime
    const bid = detail.bid

    // console.log(bid)

    return (
        <>
            <NavLink to={'/blog/'+bid} style={{'textDecoration' : 'none'}} >

                <div className="blog">

                    <div className="img_name">

                        <div className="writer_img">
                            <img src="../../../public/images/vite.svg" alt="" />
                        </div>

                        <div className="writer_name">
                            <p>{authorName}, &nbsp;{readtime}</p>
                        </div>

                    </div>

                    <div className="blog_title">
                        <p>{blogTitle}</p>
                    </div>

                </div>
            </NavLink>

        </>
    )
}

export default Latestblog