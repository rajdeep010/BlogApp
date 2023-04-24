import { FiMoreVertical } from "react-icons/fi";
import moment from "moment";

const Comment = (props) => {

    const user = props.value
    // console.log(user)

    // console.log(moment().format('DD/MM/YYYY HH:mm:ss'))

    return (
        <>
            <div className="cmnt">
                <div className="person-img">
                    <img src="../../public/vite.svg" alt="img" />
                </div>

                <div className="details_edit_cmnt">

                    <div className="details_edit">

                        <div className="details">
                            <div className="details_name">
                                <p> {user.name} </p>
                            </div>
                            <div className="details_about">
                                <p> {user.about} </p>
                            </div>
                        </div>

                        <div className="timeago_edit">
                            <div className="ago">
                                18 hours ago
                            </div>
                            <div className="edit">
                                <FiMoreVertical />
                            </div>
                        </div>
                    </div>

                    <div className="comment">
                        Your apporach is very good for this problem..
                    </div>
                </div>
            </div>
        </>
    )
}

export default Comment