import { BiBookmarkPlus, BiBookmarkMinus } from 'react-icons/bi'
import '../../styles/sidebarfooter.scss'


const SidebarFooter = () => {
  return (
    <>
        <div className="sidebar_about_container">
            <div className="heading">
                <p>READING LIST</p>
            </div>

            <div className="about">
                Click the <BiBookmarkPlus className='icon'/> on any post to easily add it to your bookmarked list and click on <BiBookmarkMinus className='icon' /> to remove it from your bookmarked list.
            </div>

            {/* <div className="links">
                <NavLink to='/help' className='footer_link'>Help</NavLink>
                <NavLink to='/writes' className='footer_link'>Writers</NavLink>
                <NavLink to='/blog' className='footer_link'>Blog</NavLink>
                <NavLink to='/about' className='footer_link'>About</NavLink>
            </div> */}
        </div>
    </>
  )
}

export default SidebarFooter