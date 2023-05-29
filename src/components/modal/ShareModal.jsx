import ReactDOM from 'react-dom'
import '../../styles/modal.scss'
import { FacebookShareButton, WhatsappShareButton, LinkedinShareButton } from 'react-share'
import { FacebookIcon, WhatsappIcon, LinkedinIcon } from 'react-share'



const ShareModal = ({ url, setShareModal, shareModal }) => {

    const temp = 'https://medium.com/'

    return ReactDOM.createPortal(
        <>
            <div className={shareModal ? "modal-wrapper active-wrapper" : "modal-wrapper"} onClick={() => setShareModal(false)}></div>

            <div className={shareModal ? "modal-container active-modal-container" : "modal-container"} >

                <h2>Share on</h2>

                <div className="icons-container">

                    <div className="icon" onClick={() => setShareModal(false)}>
                        <FacebookShareButton url={temp} quote={'Check out the blog'} hashtag={'#codio'} >
                            <FacebookIcon size={50} round={true} />
                        </FacebookShareButton>
                    </div>

                    <div className="icon" onClick={() => setShareModal(false)}>
                        <WhatsappShareButton url={temp} title={'CODIO'} >
                            <WhatsappIcon size={50} round={true} />
                        </WhatsappShareButton>
                    </div>

                    <div className="icon" onClick={() => setShareModal(false)}>
                        <LinkedinShareButton title={'CODIO'} summary={'Check out this blog on CODIO'} source={'CODIO'} url={temp}>
                            <LinkedinIcon size={50} round={true} />
                        </LinkedinShareButton>
                    </div>

                </div>
            </div>
        </>,

        document.querySelector('.shareModalDiv')
    )
}

export default ShareModal