import ReactDOM from 'react-dom'
import '../../styles/modal.scss'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { FaTimes } from 'react-icons/fa'
import { ref as ref_storage, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { database, storage } from '../../firebase'
import { ref, update } from 'firebase/database'
import { ToastContainer } from 'react-toastify'
import { notifier } from '../../utils/notify'


const AvatarModal = ({ setShowAvatarModal, showAvatarModal }) => {

    const authCtx = useContext(AuthContext)

    const [imageFile, setImageFile] = useState(null)
    const [file, setFile] = useState(null)

    const userID = authCtx.userId

    const updateAvatar = async (uid, url) => {
        update(ref(database, 'users/' + uid + '/details'), {
            avatarURL: url
        })
    }

    const handleAvatarUpdate = (e) => {
        e.preventDefault()

        // console.log(file)

        const avatarPath = 'avatars/' + userID
        const avatarRef = ref_storage(storage, avatarPath)

        const uploadTask = uploadBytesResumable(avatarRef, file)

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                // console.log('Upload is ' + progress + '% done')

                switch (snapshot.state) {
                    case 'paused':
                        // console.log('Upload is paused')
                        break

                    case 'running':
                        // console.log('Upload is running')
                        break
                }
            }, (error) => {
                // Error in uploading function
                switch (error.code) {
                    case 'storage/unauthorized':
                        break

                    case 'storage/canceled':
                        break
                }
            },
            () => {
                // Completion function
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    // console.log('File available at', downloadURL);
                    await updateAvatar(userID, downloadURL)
                    notifier('Avatar Update Successful', 'success')
                })
            })
    }

    const handleFileChange = (e) => {
        const fileName = e.target.files[0].name
        const fileTypeArray = fileName.split('.')
        const fileMimeType = fileTypeArray[fileTypeArray.length - 1]


        if (fileMimeType === "JPG" || fileMimeType === "jpg" || fileMimeType === "PNG" || fileMimeType === "png" || fileMimeType === "JPEG" || fileMimeType === "jpeg") {
            const reader = new FileReader()

            if (e.target.files[0])
                reader.readAsDataURL(e.target.files[0])

            reader.onload = (readerEvent) => {
                setImageFile(readerEvent.target.result)
                setFile(e.target.files[0])
            }
        }
    }

    return ReactDOM.createPortal(
        <>
            <div className={showAvatarModal ? "modal-wrapper active-wrapper" : "modal-wrapper"} onClick={() => setShowAvatarModal(false)}></div>

            <div className={showAvatarModal ? "modal-container active-modal-container" : "modal-container"}>

                <h2>Update Avatar</h2>

                <form>

                    <div className="avatar_container">

                        {!imageFile && <img src="../../../public/me.jpg" alt="dp" className='avatar_image' />}
                        {imageFile && <img src={imageFile} alt="dp" className='avatar_image' />}

                        <input
                            type="file"
                            accept="image/*"
                            className='file_input'
                            onChange={handleFileChange}
                        />

                        <div className="form-buttons">
                            <button className='btn' onClick={() => setShowAvatarModal(false)}>
                                <FaTimes /> Cancel
                            </button>

                            <button type='submit' className='btn' onClick={handleAvatarUpdate}>
                                Save Changes
                            </button>
                        </div>
                    </div>

                </form>

            </div>
            <ToastContainer/>
        </>,
        document.querySelector('.myPortalModalDiv')
    )
}

export default AvatarModal