import { FiCoffee } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import '../../styles/footer.scss'
import { FaLinkedin, FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";



const Footer = () => {
    return (
        <>
            <footer>

                <div className="icon_name">
                    <FiCoffee className="icon" />
                    <p> © 2023 CODIO</p>
                </div>

                <div className="social_icon">
                    <NavLink target="_blank" to={'https://www.linkedin.com/in/rajdeep-mallick-6477381b4/'}>
                        <FaLinkedin className="icon ln" />
                    </NavLink>

                    <NavLink target="_blank" to={'https://github.com/rajdeep010'}>
                        <FaGithub className="icon gb" />
                    </NavLink>

                    <NavLink target="_blank" to={'https://www.instagram.com/rajdeepmallick010/'}>
                        <FaInstagram className="icon ig" />
                    </NavLink>

                    <NavLink target="_blank" to={'https://www.facebook.com/profile.php?id=100059688039141&mibextid=ZbWKwL'}>
                        <FaFacebook className="icon fb" />
                    </NavLink>

                </div>

            </footer>
        </>
    )
}

export default Footer