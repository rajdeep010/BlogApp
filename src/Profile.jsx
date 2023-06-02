import { useParams } from "react-router-dom"
import About2 from "./components/about/About2"
import Latest from "./components/sidebar/Latest"
import CodioShare from "./components/editorSidebar/CodioShare"
import SidebarFooter from "./components/sidebar/SidebarFooter"
import './styles/profile.scss'
import Filter from "./components/filter/Filter"



const Profile = () => {

  const { uid } = useParams()


  return (
    <>
      <section className="profile">
        {/* <Navbar /> */}

        <div className="about_sidebar">

          <div className="name_heading">

            <div className="user_about">
              <About2 value={uid} />
            </div>

            <Filter value={uid}/>

          </div>


          <div className="profile_sidebar">
            <Latest />
            <CodioShare />
            <SidebarFooter />
          </div>

        </div>
      </section>
    </>
  )
}

export default Profile