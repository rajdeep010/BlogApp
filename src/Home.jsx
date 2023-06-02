import { BsArrowRightCircleFill } from "react-icons/bs"
import { NavLink } from "react-router-dom"
import './styles/home.scss'



const Home = () => {
    return (
        <>

            <div className="wrap">
                
            </div>

            <div className="home_container">

                <div className="codio_image">
                    <img src="./images/blog.svg" alt="" />
                </div>

                <div className="codio_about_content">

                    <div className="heading">
                        <img src="./images/mug-hot.svg" alt="" />
                        <h2>CODIO</h2>
                    </div>

                    <div className="codio_one_line">
                        UNLEASHING THE TECH
                    </div>

                    <div className="codio_about">
                        The ultimate destination for all things coding and technology. Dive into a virtual treasure trove of insightful and engaging blogs that cater to both novice and expert coders alike. Stay updated with the latest trends, discover innovative solutions, and gain valuable insights. Join our community and embark on an exciting journey of knowledge sharing, problem-solving, and endless possibilities. With CODIO, the world of tech is just a click away!
                    </div>

                    <div className="sign_in_route">
                        <NavLink to='/login'>
                            <button className="btn">Get Started <BsArrowRightCircleFill />  </button>
                        </NavLink>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Home