import { createContext, useState } from "react"
import moment from "moment";
import uniqid from 'uniqid'

const BlogContext = createContext({
    value: '',
    type: '',
    makeBlog: () => { },
    updateVal: () => { },
    makeComment: () => { }
})

const BlogProvider = (props) => {

    const [value, setValue] = useState("");

    const updateVal = (val) => {
        setValue(val);
    }

    const deleteBlog = (uid) => {

    }

    const updateCount = (uid) => {
        
    }

    const makeBlog = (title, val, userId, type, name) => {

        let content = val.replace(/<[^>]+>/g, '')

        let readtime = Math.round(content.length / 150)

        if(readtime > 1)
            readtime = readtime + ' mins read'

        else
            readtime = readtime + ' min read'

        const bid = uniqid()

        return ({
            'authorid': userId,
            'bid': bid,
            'authorName': name,
            'blogTitle': title,
            'blogContent': content,
            'blogHTML': val,
            'type': type.toUpperCase(),
            'metrics': {
                'likes': 0,
                'cmnts': 0
            },
            'comments': [],
            'date': moment().format('DD/MM/YYYY'),
            'readtime': readtime
        })
    }

    const makeComment = (comment, author) => {
        const commentID = uniqid('cmnt-')

        return ({
            'commentID': commentID,
            'comment': comment,
            'time':  moment().format('DD/MM/YYYY HH:mm:ss'),
            'author': author
        })
    }

    const state = {
        value: value,
        updateVal: updateVal,
        makeBlog: makeBlog,
        makeComment: makeComment
    }

    return (
        <BlogContext.Provider value={state}>
            {props.children}
        </BlogContext.Provider>
    )
}

export default BlogProvider;

export { BlogContext }