import { createContext, useState } from "react"


const BlogContext = createContext({
    value: "",
    type: '',
    makeBlog: () => { },
    updateVal: () => { }
})

const BlogProvider = (props) => {

    const [value, setValue] = useState("");

    const updateVal = (val) => {
        setValue(val);
    }

    const makeBlog = (title, val, userId, type) => {

        return ({
            'author': userId,
            'blogTitle': title,
            'blogContent': val,
            'type': type
        })
    }

    const state = {
        value: value,
        updateVal: updateVal,
        makeBlog: makeBlog
    }

    return (
        <BlogContext.Provider value={state}>
            {props.children}
        </BlogContext.Provider>
    )
}

export default BlogProvider;

export { BlogContext }