import { useContext, useState } from 'react'
import './category.scss'
import { BlogContext } from '../../context/BlogContext'
import { TitleContext } from '../../context/TitleContext'
import { AuthContext } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { database, storage } from '../../firebase';
import { onValue, ref, set, update } from 'firebase/database';
import { ref as ref_storage, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useNavigate } from 'react-router-dom';

const Category = () => {

    const blogContext = useContext(BlogContext)
    const titleContext = useContext(TitleContext)
    const authCtx = useContext(AuthContext)

    const [image, setImage] = useState(null)
    const [url, setURL] = useState('')

    const navigate = useNavigate()
    const goToHome = () => {
        navigate('/')
    }



    const notify = (msg, type) => {

        if (type == 'success') {
            toast.success(msg, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }

        else if (type == 'error') {
            toast.error(msg, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }

        else if (type == 'warning') {
            toast.warn(msg, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }

        else if (type == 'info') {
            toast.info(msg, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
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
        if (image == null)
            return

        const storageRef = ref_storage(storage, 'posters/' + bid)
        const uploadTask = uploadBytesResumable(storageRef, image)

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

        if(title.trim().length === 0){
            notify('Please give a title', 'warning')
            return
        }

        if(title.trim().length > 100) {
            notify('Give a short Title !!', 'warning')
            return
        }

        if(val.trim().length === 0){
            notify('Write some content !', 'warning')
            return
        }

        if(name.trim().length === 0){
            notify('Update profile details', 'error')
            return
        }

        const blog = blogContext.makeBlog(title, val, userId, type, name)
        const bid = blog.bid

        if(blog.blogContent.trim().length === 0 || blog.blogContent.trim().length < 200){
            notify('Write at least 200 letters !!', 'error')
            return
        }

        const res = set(ref(database, 'blogs/' + bid), blog)

        update(ref(database, 'users/' + userId + '/details'), {
            blogCount: obj.blogCount + 1
        })

        if (res) {
            notify('Successfully Submitted', 'success')
        } else {
            notify('Something Went Wrong !!!', 'error')
        }

        // After blog submission make sure to upload the poster of the blog


        // Blog Poster Submission (if any)
        handleFileUpload(bid)
        
        notify('Redirecting to Home', 'info')
        setTimeout(goToHome, 4000)
    }

    return (
        <>
            <div className="category_submit_box">

                <div className="heading">
                    <p>CATEGORY & IMAGE</p>
                </div>

                <div className="category_about">
                    <h6>Select a Category & Choose Poster Image</h6>

                    <small> <b>NOTE :</b> Please try to give a rectangular poster image</small>
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


                        <div className="file_box">
                            <input type="file" accept="image/*" className='file_input' onChange={(e) => setImage(e.target.files[0])} />
                        </div>

                        <input type="submit" className='btn' value='Submit' onClick={submit} />
                        <ToastContainer />
                    </form>

                </div>

            </div>
        </>
    )
}

export default Category