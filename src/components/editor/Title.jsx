import { useState, useContext, useEffect } from "react"
import { TitleContext } from "../../context/TitleContext"

import '../editor/title.scss'
import { BlogContext } from "../../context/BlogContext"

const Title = () => {

    const titleContext = useContext(TitleContext)

    const [val, setVal] = useState('')

    const update = (event) => {
        const title = event.target.value
        setVal(title)
        // console.log(title)
        titleContext.updateTitle(title)
    }

    return (
        <>
            <input 
            className="title-box" 
            onChange={update} 
            placeholder="Enter the title..."
            value={val}
            />
        </>
    )
}

export default Title