import { createContext, useEffect, useState } from "react"

import { database } from "../firebase";
import { onValue, ref, set, update, remove, query, orderByChild } from "firebase/database";

const BlogContext = createContext({
    value: '',
    type: '',

    makeBlog: () => { },
    updateVal: () => { },
    giveLatestBlogs: () => {}
})

const BlogProvider = (props) => {

    const [value, setValue] = useState("");

    const updateVal = (val) => {
        setValue(val);
    }

    const giveLatestBlogs = () => {
        const latest = query(ref(database, 'blogs/'), orderByChild('key'))
        console.log(latest)
    }


    const makeBlog = (title, val, userId, type) => {

        return ({
            'author': userId,
            'blogTitle': title,
            'blogContent': val,
            'type': type,
            'metrics': {
                'likes': 0,
            },
            'comments': []
        })
    }

    const state = {
        value: value,
        updateVal: updateVal,
        makeBlog: makeBlog,
        giveLatestBlogs: giveLatestBlogs
    }

    return (
        <BlogContext.Provider value={state}>
            {props.children}
        </BlogContext.Provider>
    )
}

export default BlogProvider;

export { BlogContext }