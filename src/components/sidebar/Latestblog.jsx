import { NavLink } from 'react-router-dom'

import './latestblog.scss'


const Latestblog = () => {
    return (
        <>
            <NavLink to='/blog' style={{'textDecoration' : 'none'}} >

                <div className="blog">

                    <div className="img_name">

                        <div className="writer_img">
                            <img src="../../../public/images/vite.svg" alt="" />
                        </div>

                        <div className="writer_name">
                            <p>Anumoy Nandy, Guardian</p>
                        </div>

                    </div>

                    <div className="blog_title">
                        <p>Biweekly Contest LeetCode 98 Solutions</p>
                    </div>

                </div>
            </NavLink>

        </>
    )
}

export default Latestblog