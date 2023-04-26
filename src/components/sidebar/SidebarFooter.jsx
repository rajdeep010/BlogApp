import { MdBookmarkAdd } from 'react-icons/md'
import { NavLink } from 'react-router-dom'

import './sidebarfooter.scss'


const SidebarFooter = () => {
  return (
    <>
        <div className="sidebar_about_container">
            <div className="heading">
                <p>READING LIST</p>
            </div>

            <div className="about">
                Click the <MdBookmarkAdd className='icon'/> on any post to easily add it to your reading list or a custom list that you can share.
            </div>

            <div className="links">
                <NavLink to='/help' className='footer_link'>Help</NavLink>
                <NavLink to='/writes' className='footer_link'>Writers</NavLink>
                <NavLink to='/blog' className='footer_link'>Blog</NavLink>
                <NavLink to='/about' className='footer_link'>About</NavLink>
            </div>
        </div>
    </>
  )
}

export default SidebarFooter