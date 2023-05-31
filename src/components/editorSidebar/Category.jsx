import { useContext, useState } from 'react'
import './category.scss'
import { BlogContext } from '../../context/BlogContext'
import { TitleContext } from '../../context/TitleContext'
import { AuthContext } from '../../context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import { database, storage } from '../../firebase';
import { onValue, ref, set, update } from 'firebase/database';
import { ref as ref_storage, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useNavigate } from 'react-router-dom';
import { notifier } from '../../utils/notify';
import { ToastContainer } from 'react-toastify';


const Category = () => {

    const blogContext = useContext(BlogContext)
    const titleContext = useContext(TitleContext)
    const authCtx = useContext(AuthContext)

    const [image, setImage] = useState(null)
    const [url, setURL] = useState('')

    const navigate = useNavigate()
    const goToHome = () => {
        navigate('/dashboard')
    }


    // setting the type of blog
    const [type, setType] = useState('webdev')

    const updateType = (e) => {
        setType(e.target.value)
    }

    const updatePoster = async (bid, url) => {

        update(ref(database, 'blogs/' + bid), {
            posterURL: url
        })
    }

    const handleFileUpload = (bid) => {
        if (image == null) {
            return
        }

        const storageRef = ref_storage(storage, 'posters/' + bid)
        const uploadTask = uploadBytesResumable(storageRef, image)

        uploadTask.on('state_changed',
            (snapshot) => {
                // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                // // console.log('Upload is ' + progress + '% done')

                // switch (snapshot.state) {
                //     case 'paused':
                //         // console.log('Upload is paused')
                //         break

                //     case 'running':
                //         // console.log('Upload is running')
                //         break
                // }
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
                    setURL(downloadURL)
                    await updatePoster(bid, downloadURL)
                })
            })
    }

    const submit = async (event) => {
        event.preventDefault()

        const title = titleContext.title
        const val = blogContext.value
        const userId = authCtx.userId

        const dbRef = ref(database, ('users/' + userId + '/details'))

        let name = ''

        let obj = {}
        onValue(dbRef, (snapshot) => {
            const res = snapshot.val()
            obj = res
            name = res.name
        })

        if (title.trim().length === 0) {
            notifier('Please give a title', 'warning')
            return
        }

        if (title.trim().length > 100) {
            notifier('Give a short Title !!', 'warning')
            return
        }

        if (title.trim().length < 15) {
            notifier('Title Must Be Longer', 'warning')
            return
        }

        if (val.trim().length === 0) {
            notifier('Write some content !', 'warning')
            return
        }

        if (name.trim().length === 0) {
            notifier('Update profile details', 'error')
            return
        }

        const blog = blogContext.makeBlog(title, val, userId, type, name)
        const bid = blog.bid

        if (blog.blogContent.trim().length === 0 || blog.blogContent.trim().length < 200) {
            notifier('Write at least 200 letters !!', 'error')
            return
        }

        const res = set(ref(database, 'blogs/' + bid), blog)

        update(ref(database, 'users/' + userId + '/details'), {
            blogCount: obj.blogCount + 1
        })
            .then(() => {
                notifier('Successfully Submitted', 'success')
                handleFileUpload(bid)

                notifier('Redirecting to Home', 'info')
                setTimeout(goToHome, 4000)
            })
            .catch((err) => {
                notifier('Something Went Wrong !!!', 'error')
            })
    }

    return (
        <>
            <div className="category_submit_box">

                <div className="heading">
                    <p>CATEGORY & IMAGE</p>
                </div>

                <div className="category_about">
                    <h6>Select a Category & Choose Poster Image</h6>
                </div>

                <div className="category_box">

                    <form>

                        <select name="category" id="category" value={type} onChange={updateType}>

                            <option value="WEB-DEV" defaultValue>Web Development</option>
                            <option value="ANRD-DEV">Android Development</option>
                            <option value="ML" >ML</option>
                            <option value="AI">AI</option>
                            <option value="CP">CP</option>
                            <option value="DSA">DSA</option>
                            <option value="MISC">Misc</option>

                        </select>

                        <div className="file_upload_heading">
                            <div className="elem heading">
                                <p>Upload an Image File</p>
                            </div>

                            <div className="elem">
                                <small> <b>NOTE :</b> Please try to give a rectangular poster image</small>
                            </div>
                        </div>


                        <div className="file_box">
                            <input type="file" accept="image/*" className='custom-file-input' onChange={(e) => setImage(e.target.files[0])} />
                        </div>

                        <input type="submit" className='btn' value='Submit' onClick={submit} />

                    </form>

                </div>

            </div>

            <ToastContainer />
        </>
    )
}

export default Category