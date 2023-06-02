import { FiCoffee } from "react-icons/fi";
import { FaFacebook, FaInstagram, FaTelegram, FaLinkedin, FaGithub } from "react-icons/fa";
import '../../styles/codioShare.scss'
import { NavLink } from "react-router-dom";


const CodioShare = () => {
    return (
        <>
            <div className="codio_share">

                <div className="codio">
                    <div className="codio_logo">
                        <h1><FiCoffee /></h1>
                    </div>
                    <div className="codio_heading">
                        <h1>CODIO</h1>
                    </div>
                </div>

                <div className="share">

                    <div className="share_about">
                        Follow us on social media platform & connect for future updates.
                    </div>

                    <div className="social_icon">
                        <NavLink target="_blank" to={'https://www.linkedin.com/in/rajdeep-mallick-6477381b4/'}>
                            <FaLinkedin className="icon" />
                        </NavLink>

                        <NavLink target="_blank" to={'https://github.com/rajdeep010'}>
                            <FaGithub className="icon" />
                        </NavLink>

                        <NavLink target="_blank" to={'https://www.instagram.com/rajdeepmallick010/'}>
                            <FaInstagram className="icon" />
                        </NavLink>

                        <NavLink target="_blank" to={'https://www.facebook.com/profile.php?id=100059688039141&mibextid=ZbWKwL'}>
                            <FaFacebook className="icon" />
                        </NavLink>

                    </div>

                </div>

            </div>
        </>
    )
}

export default CodioShare