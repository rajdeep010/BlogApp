import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import './category.scss'
import { BlogContext } from '../../context/BlogContext'
import { TitleContext } from '../../context/TitleContext'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { database } from '../../firebase';
import { onValue, ref, set, remove, update } from 'firebase/database';

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

    const submit = async (event) => {
        event.preventDefault()

        const val = blogContext.value
        const title = titleContext.title
        const userId = 105

        const res = set(ref(database, 'users/'+ userId), {
            'blogType': type,
            'blogTitle': title,
            'content': val
        })

        if (res) {
            notifySubmit()
        } else {
            notifyError()
        }

        const details = ref(database, 'users/'+userId)
        onValue(details, (snapshot) => {
            const data = snapshot.val()
            console.log(data)

            for(const items in data){
                console.log(items + " " + data[items])
            }
        })
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