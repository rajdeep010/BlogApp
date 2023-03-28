import { MdBookmarkAdd } from 'react-icons/md'
// import { a } from 'react-router-dom'

import './sidebarfooter.scss'

const SidebarFooter = () => {
  return (
    <>
        <div className="sidebar_about_container">
            <div className="heading">
                <p>READING LIST</p>
            </div>

            <div className="about">
                Click the <MdBookmarkAdd/> on any post to easily add it to your reading list or a custom list that you can share.
            </div>

            <div className="links">
                <a href='/help' className='footer_link'>Help</a>
                <a href='/writes' className='footer_link'>Writers</a>
                <a href='/blogs' className='footer_link'>Blog</a>
                <a href='/about' className='footer_link'>About</a>
            </div>
        </div>
    </>
  )
}

export default SidebarFooter