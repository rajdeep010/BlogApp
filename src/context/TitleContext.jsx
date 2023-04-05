import { createContext, useState } from "react";

const TitleContext = createContext({
    title: "",
    updateTitle: () => { }
})

const TitleProvider = (props) => {

    const [title, setTitle] = useState('')

    const updateTitle = (val) => {
        setTitle(val)
    }

    const state = {
        title: title,
        updateTitle
    }

    return (
        <TitleContext.Provider value={state}>
            {props.children}
        </TitleContext.Provider>
    )
}

export default TitleProvider

export { TitleContext }