import ReactDOM from 'react-dom'
import '../../styles/modal.scss'
import { FaUser, FaEdit, FaTimes } from 'react-icons/fa'
import { database } from '../../firebase'
import { ref, update, set, onValue } from 'firebase/database'
import { AuthContext } from '../../context/AuthContext'
import { useContext, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { notifier } from '../../utils/notify'


const Modal = ({ setShowModal, showModal }) => {

    const authCtx = useContext(AuthContext)
    const userID = authCtx.userId

    const [user, setUser] = useState({
        'name': '',
        'about': ''
    })

    let key, value
    const getDetails = (e) => {
        key = e.target.name
        value = e.target.value
        setUser({ ...user, [key]: value })
    }


    const handleUpdateProfile = (e) => {
        e.preventDefault()
        
        const dbRef = ref(database, 'users/' + userID + '/details')
        const name = user.name, about = user.about

        if(name.trim().length === 0 || about.trim().length === 0){
            notifier("Fields Can't be empty", 'warning')
            return
        }

        else if(name.trim().length < 7){
            notifier('Name Must be 7 Character Long', 'warning')
            return
        }

        update(dbRef, {
            name: name,
            about: about
        })
        .then(() => {
            setUser({
                name: '',
                about: ''
            })
            notifier('Details Updated', 'success')
        })
        .catch((err) => {
            notifier('Something Went Wrong', 'error')
        })

    }


    useEffect(() => {
        const dbRef = ref(database, 'users/'+ userID + '/details')

        onValue(dbRef, (snapshot) => {
            if(snapshot){
                user.name = snapshot.val().name
                user.about = snapshot.val().about
            }
        })
    },[])


    return ReactDOM.createPortal(
        <>

            <div className={showModal ? "modal-wrapper active-wrapper" : "modal-wrapper"} onClick={() => setShowModal(false)}></div>
            <div className={showModal ? "modal-container active-modal-container" : "modal-container"}>

                <h1>Edit Profile</h1>

                <form>

                    <div className="input-field">
                        <FaUser className='icon' />
                        <input type="text" placeholder="Name" name="name" value={user.name} autoComplete='off' onChange={getDetails} />
                    </div>

                    <div className="input-field">
                        <FaEdit className='icon' />
                        <input type="text" placeholder="About" name='about' value={user.about} autoComplete='off' onChange={getDetails} />
                    </div>

                    <div className="form-buttons">
                        <button className='btn' onClick={() => setShowModal(false)}>
                            <FaTimes /> Cancel
                        </button>

                        <button type='submit' className='btn' onClick={handleUpdateProfile}>
                            Save Changes
                        </button>

                    </div>

                </form>

            </div>
            <ToastContainer />
        </>,
        document.querySelector('.myPortalModalDiv')
    )
}

export default Modal