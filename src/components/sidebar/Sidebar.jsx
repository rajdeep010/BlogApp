import './sidebar.scss'

import Latest from './Latest'
import Creators from './Creators'
import SidebarFooter from './SidebarFooter'

const Sidebar = () => {
    return (
        <>
            <div className="sidebar_container">

                <Latest/>

                <Creators/>

                <SidebarFooter/>

            </div>
        </>
    )
}

export default Sidebar