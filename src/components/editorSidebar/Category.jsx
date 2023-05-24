import { useContext, useState } from 'react'
import './category.scss'
import { BlogContext } from '../../context/BlogContext'
import { TitleContext } from '../../context/TitleContext'
import { AuthContext } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { database } from '../../firebase';
import { onValue, ref, set, update } from 'firebase/database';



const Category = () => {

    const blogContext = useContext(BlogContext)
    const titleContext = useContext(TitleContext)
    const authCtx = useContext(AuthContext)

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
    }

    // setting the type of blog
    const [type, setType] = useState('webdev')

    const updateType = (e) => {
        setType(e.target.value)
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

        const blog = blogContext.makeBlog(title, val, userId, type, name)
        const bid = blog.bid
        const res = set(ref(database, 'blogs/' + bid), blog)

        console.log(blog)

        update(ref(database, 'users/' + userId + '/details'), {
            blogCount: obj.blogCount + 1
        })

        if (res) {
            notify('Successfully Submitted', 'success')

        } else {
            notify('Something Went Wrong !!!', 'error')
        }
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

                        <div className="file_box">
                            <input type="file" accept="image/*" className='file_input' />
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