import Creator from "./Creator"
import { useContext, useEffect, useState } from "react"

import { WriterContext } from "../../context/WriterContext"

const Creators = () => {

    const [arr, setArr] = useState([])

    const writerCtx = useContext(WriterContext)

    useEffect(() => {
        const writers = writerCtx.getWriters()
        setArr(writers)
    }, [])

    return (
        <>
            <section className="creators">

                <div className="heading"><p>WRITERS</p></div>

                {arr.map((each) => (
                    <Creator value={each} />
                ))}

            </section>
        </>
    )
}

export default Creators