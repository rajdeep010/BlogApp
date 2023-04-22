import { useContext, useState } from 'react'

import './category.scss'
import { BlogContext } from '../../context/BlogContext'
import { TitleContext } from '../../context/TitleContext'
import { AuthContext } from '../../context/AuthContext';

import { hashRandom } from "react-hash-string";

import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { database } from '../../firebase';
import { onValue, ref, set, remove, update, push } from 'firebase/database';

const Category = () => {

    const blogContext = useContext(BlogContext)
    const titleContext = useContext(TitleContext)
    const authCtx = useContext(AuthContext)

    const notify = (msg, type) => {

        if(type == 'success')
        {
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

        else if(type == 'error')
        {
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

    const update = (e) => {
        setType(e.target.value)
    }

    const submit = async (event) => {
        event.preventDefault()

        // String to HTML converter
        // const parser = new DOMParser();
        // const html = parser.parseFromString(val, 'text/html');
        // const body = html.body
        // console.log(body)

        const title = titleContext.title
        const val = blogContext.value
        const userId = authCtx.userId


        const blog = blogContext.makeBlog(title, val, userId, type)

        // console.log(blog)

        const id = hashRandom()
        // console.log(id)

        const time = moment().format().valueOf()
        const res = set(ref(database, 'blogs/' + time + userId), blog)


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
                    <p>CATEGORY</p>
                </div>

                <div className="category_about">
                    <h4>Please select a category</h4>
                    <p>Selecting a category will help fast-track searching process. Please select an appropriate category from the following.</p>
                </div>

                <div className="category_box">

                    <form>

                        <select name="category" id="category" value={type} onChange={update}>

                            <option value="WEB-DEV" defaultValue>Web Development</option>
                            <option value="ANRD-DEV">Android Development</option>
                            <option value="ML" >ML</option>
                            <option value="AI">AI</option>
                            <option value="CP">CP</option>
                            <option value="DSA">DSA</option>
                            <option value="MISC">Misc</option>

                        </select>

                        <input type="submit" className='btn' value='Submit' onClick={submit} />
                        <ToastContainer />
                    </form>

                </div>

            </div>
        </>
    )
}

export default Category