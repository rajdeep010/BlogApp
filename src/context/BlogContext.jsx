import { createContext, useState } from "react"

import { database } from "../firebase";
import { onValue, ref, set, update, remove } from "firebase/database";

const BlogContext = createContext({
    value: '',
    type: '',

    makeBlog: () => { },
    updateVal: () => { },
    giveBlogs: () => { }
})

const BlogProvider = (props) => {

    const [value, setValue] = useState("");

    const updateVal = (val) => {
        setValue(val);
    }

    const giveBlogs = () => {
        let arr = []
        onValue(ref(database, 'blogs/'), (snapshot) => {
            if (snapshot) 
            {
                const all = snapshot.val()
                const blogs = Object.values(all)
                arr = blogs
            }
        })
        return arr
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
        makeBlog: makeBlog,
        giveBlogs: giveBlogs
    }

    return (
        <BlogContext.Provider value={state}>
            {props.children}
        </BlogContext.Provider>
    )
}

export default BlogProvider;

export { BlogContext }