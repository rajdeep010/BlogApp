import { useContext, useState } from 'react'
import './category.scss'
import { BlogContext } from '../../context/BlogContext'
import { TitleContext } from '../../context/TitleContext'

const Category = () => {

    // setting the type of blog
    const [type, setType] = useState('webdev')

    const update = (e) => {
        setType(e.target.value)
    }

    const blogContext = useContext(BlogContext);
    const titleContext = useContext(TitleContext)

    const submit = (event) => {
        event.preventDefault()
        console.log(type)
        console.log(blogContext.value);
        console.log("Title : " + titleContext.title)
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

                        {/* <p>You selected {type} </p> */}

                        <input type="submit" className='btn' value='Submit' onClick={submit} />

                    </form>

                </div>

            </div>
        </>
    )
}

export default Category