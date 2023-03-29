import './category.scss'

const Category = () => {
    return (
        <>
            <div className="category_submit_box">

                <div className="category_heading">
                    <h1>Category</h1>
                </div>

                <div className="category_about">
                    <h4>Please select a category</h4>
                    <p>Selecting a category will help fast-track searching process. Please select an appropriate category from the following.</p>
                </div>

                <div className="category_box">

                    <form action="/category">

                        <select name="category" id="category">
                            <option value="development" selected>Web Development</option>
                            <option value="development">Android Development</option>
                            <option value="development">ML</option>
                            <option value="development">AI</option>
                            <option value="cp">CP</option>
                            <option value="dsa">DSA</option>
                            <option value="misc">Misc</option>
                        </select>

                        <input type="submit" className='btn' value='Submit' />

                    </form>

                </div>

            </div>
        </>
    )
}

export default Category