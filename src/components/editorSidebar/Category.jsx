import { useContext } from 'react'
import './category.scss'
import { BlogContext } from '../../context/BlogContext'

const Category = () => {

    const blogContext = useContext(BlogContext);

    const submit = (event) => {
        event.preventDefault()
        console.log(blogContext.value);
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

                        <select name="category" id="category">
                            <option value="development" selected>Web Development</option>
                            <option value="development">Android Development</option>
                            <option value="development">ML</option>
                            <option value="development">AI</option>
                            <option value="cp">CP</option>
                            <option value="dsa">DSA</option>
                            <option value="misc">Misc</option>
                        </select>

                        <input type="submit" className='btn' value='Submit' onClick={submit} />

                    </form>

                </div>

            </div>
        </>
    )
}

export default Category