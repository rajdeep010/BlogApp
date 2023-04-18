import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import './category.scss'
import { BlogContext } from '../../context/BlogContext'
import { TitleContext } from '../../context/TitleContext'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


import Loader from '../loader/Loader';


const Category = () => {

    const navigate = useNavigate()
    const goToHome = () => {
        navigate('/')
    }

    const notifySubmit = () => {

        toast.success('Submitted Successfully 😊', {
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

    const notifyError = () => {
        toast.error('Something Went Wrong !!! 😟', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    // setting the type of blog
    const [type, setType] = useState('webdev')

    const update = (e) => {
        setType(e.target.value)
    }

    const blogContext = useContext(BlogContext);
    const titleContext = useContext(TitleContext)

    const submit = (event) => {
        event.preventDefault()

        const val = blogContext.value

        const res = fetch(
            'https://sample-blog-1d6c6-default-rtdb.firebaseio.com/sampleblog.json',
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ blogType: type, content: val }),
            }
        )

        if (res) {
            notifySubmit()

            const timeout = setTimeout(goToHome, 5000)

            timeout()

            console.log(type)
            console.log(blogContext.value);
            console.log("Title : " + titleContext.title)
        }
        else {
            notifyError()
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
                        <ToastContainer/>
                    </form>

                </div>

            </div>
        </>
    )
}

export default Category