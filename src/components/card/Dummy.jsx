import './dummy.scss'
import { FiCoffee } from "react-icons/fi";


const Dummy = (props) => {

    const message = props.message

    return (
        <>
            <div className="dummy_container">

                <div className="message">
                    {message}
                </div>

            </div>
        </>
    )
}

export default Dummy