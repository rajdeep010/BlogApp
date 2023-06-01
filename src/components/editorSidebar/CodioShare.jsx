import { FiCoffee } from "react-icons/fi";
import { FaFacebook, FaInstagram, FaTelegram, FaLinkedin } from "react-icons/fa";
import '../../styles/codioShare.scss'


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
                        <FaFacebook className="icon"/>
                        <FaInstagram className="icon"/>
                        <FaLinkedin className="icon"/>
                        <FaTelegram className="icon"/>
                    </div>

                </div>

            </div>
        </>
    )
}

export default CodioShare