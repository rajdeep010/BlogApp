import { createContext, useState } from "react"

const BlogContext = createContext({
    value: "",
    updateVal: () => {}
})


const BlogProvider = (props) => {

    const [value, setValue] = useState("");

    const updateVal = (val)=>{
        setValue(val);
    }

    const state = {
        value: value,
        updateVal: updateVal
    }

    return (
        <BlogContext.Provider value={state}>
            {props.children}
        </BlogContext.Provider>
    )
}

export default BlogProvider;

export { BlogContext }