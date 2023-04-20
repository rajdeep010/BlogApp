import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import './category.scss'
import { BlogContext } from '../../context/BlogContext'
import { TitleContext } from '../../context/TitleContext'
import { AuthContext } from '../../context/AuthContext';

import { hashRandom } from "react-hash-string";


import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { database } from '../../firebase';
import { onValue, ref, set, remove, update } from 'firebase/database';

const Category = () => {

    const navigate = useNavigate()

    const blogContext = useContext(BlogContext)
    const titleContext = useContext(TitleContext)
    const authCtx = useContext(AuthContext)

    const goToHome = () => {
        navigate('/')
    }

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

        console.log(userId + " hello world")

        const blog = blogContext.makeBlog(title, val, userId, type)

        console.log(blog)

        const id = hashRandom()
        console.log(id)

        const res = set(ref(database, 'blogs/'+ id), blog)

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

                            <option value="webdev" selected>Web Development</option>
                            <option value="anddev">Android Development</option>
                            <option value="ml" >ML</option>
                            <option value="ai">AI</option>
                            <option value="cp">CP</option>
                            <option value="dsa">DSA</option>
                            <option value="misc">Misc</option>

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