import { useEffect, useState } from "react"

import '../button/button.scss'

const Button = (props) => {

    const [val, setVal] = useState(props.value)

    const update = () => {
        setVal((val === "FOLLOW" ? "UNFOLLOW" : "FOLLOW"))
    }

    return (
        <>
            <button className={val === "FOLLOW" ? "btn follow" : "btn unfollow"} onClick={update}>
                {val}
            </button>
        </>
    )
}

export default Button