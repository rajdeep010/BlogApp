import { useContext, useEffect, useState } from 'react'
import './about2.scss'
import { onValue, ref } from 'firebase/database'
import { database } from '../../firebase'
import { FaUserEdit, FaCamera } from "react-icons/fa";
import Modal from '../modal/Modal';
import AvatarModal from '../modal/AvatarModal';
import { AuthContext } from '../../context/AuthContext';


const About2 = (props) => {

    const authCtx = useContext(AuthContext)

    const uid = props.value

    const [showModal, setShowModal] = useState(false)
    const [showAvatarModal, setShowAvatarModal] = useState(false)



    const [user, setUser] = useState({
        'name': '',
        'about': '',
        'blogCount': ''
    })


    useEffect(() => {
        onValue(ref(database, ('users/' + uid + '/details/')), (snapshot) => {
            if (snapshot) {
                const details = snapshot.val()
                const obj = {
                    'name': details.name,
                    'about': details.about,
                    'blogCount': details.blogCount
                }

                setUser(obj)
            }
        })
    }, [])

    useEffect(() => {
        if(showModal || showAvatarModal)
            document.body.style.overflowY = 'hidden'
        
        else
            document.body.style.overflowY = 'visible'
    
    }, [showModal, showAvatarModal])


    return (
        <>
            <section className="author_about">

                <div className="author_details">
                    <h2> {user.name}<small>, {user.blogCount} {(user.blogCount > 1) ? ' blogs' : ' blog'}</small></h2>
                    <p className='short_details'> {user.about} </p>
                </div>

                <div className="bookmarked_and_edit_buttons">
                    {authCtx.user && authCtx.user.emailVerified  && <FaUserEdit className='about2_icon' onClick={ () => setShowModal(true)} />}
                    {showModal &&  <Modal setShowModal={setShowModal} showModal = {showModal}/>}

                    {authCtx.user && authCtx.user.emailVerified  && <FaCamera className='about2_icon' onClick={ () => setShowAvatarModal(true)} />}
                    {showAvatarModal && <AvatarModal setShowAvatarModal={setShowAvatarModal} showAvatarModal = {showAvatarModal}/>}

                </div>

            </section>
        </>
    )
}

export default About2