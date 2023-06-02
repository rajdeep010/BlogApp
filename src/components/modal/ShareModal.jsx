import ReactDOM from 'react-dom'
import '../../styles/modal.scss'
import { FacebookShareButton, LinkedinShareButton, WhatsappShareButton } from 'react-share'
import { FaFacebook, FaWhatsapp, FaLinkedin } from 'react-icons/fa';


const ShareModal = ({ setShareModal, shareModal, temp }) => {

    return ReactDOM.createPortal(
        <>
            <div className={shareModal ? "modal-wrapper active-wrapper" : "modal-wrapper"} onClick={() => setShareModal(false)}></div>

            <div className={shareModal ? "modal-container active-modal-container" : "modal-container"}>
                <h2>Share On</h2>

                <br />

                <div className="fbwpln">
                    <div className="share_icons">
                        <FacebookShareButton className='icon'  url={temp} quote={'Check out the blog'} hashtag={'#codio'} >
                            <FaFacebook className='fb'/>
                        </FacebookShareButton>
                    </div>

                    <div className="share_icons">
                        <WhatsappShareButton className='icon'  url={temp} title={'❤️ Check out this blog on CODIO ❤️:'} separator={' '}>
                            <FaWhatsapp className="wp"/>
                        </WhatsappShareButton>
                    </div>

                    <div className="share_icons">
                        <LinkedinShareButton className='icon'  title={'CODIO'} summary={'Check out this blog on CODIO'} source={'CODIO'} url={temp}>
                            <FaLinkedin className='ln'/>
                        </LinkedinShareButton>
                    </div>
                </div>
            </div>
        </>,
        document.querySelector('.shareModalDiv')
    )
}

export default ShareModal