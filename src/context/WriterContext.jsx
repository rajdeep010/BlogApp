import { createContext } from "react"

import { database } from "../firebase"
import { onValue, ref, set, update, remove } from "firebase/database"


const WriterContext = createContext({
    getWriters: () => { }
})

const WriterProvider = (props) => {

    const getWriters = () => {
        let arr = []
        onValue(ref(database, 'users/'), (snapshot) => {
            if (snapshot) {
                const all = snapshot.val()
                const writers = Object.values(all)
                writers.map((writer) => {
                    const obj = writer.details
                    if (obj.blogCount > 0) {
                        arr.push(
                            {
                                'name': obj.name,
                                'about': obj.about
                            }
                        )
                    }
                })
            }
        })
        return arr
    }

    const state = {
        getWriters: getWriters
    }

    return (
        <WriterContext.Provider value={state}>
            {props.children}
        </WriterContext.Provider>
    )
}

export default WriterProvider
export { WriterContext }