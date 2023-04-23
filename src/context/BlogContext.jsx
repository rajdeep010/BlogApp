import { createContext, useState } from "react"
import moment from "moment";
import uniqid from 'uniqid'

const BlogContext = createContext({
    value: '',
    type: '',
    makeBlog: () => { },
    updateVal: () => { },
})

const BlogProvider = (props) => {

    const [value, setValue] = useState("");

    const updateVal = (val) => {
        setValue(val);
    }

    const makeBlog = (title, val, userId, type, name) => {

        let content = val.replace(/<[^>]+>/g, '')

        let readtime = Math.round(content.length / 150)

        if(readtime > 1)
            readtime = readtime + ' mins read'

        else
            readtime = readtime + ' min read'

        if(content.length > 400)
            content = content.substr(0, 400)

        if(content[content.length-1] == ' ')
            content[content.length-1] = ''

        content += '...'

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

    const state = {
        value: value,
        updateVal: updateVal,
        makeBlog: makeBlog,
    }

    return (
        <BlogContext.Provider value={state}>
            {props.children}
        </BlogContext.Provider>
    )
}

export default BlogProvider;

export { BlogContext }