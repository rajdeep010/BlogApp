import './editSidebar.scss'

import Category from "./Category"
import CodioShare from "./CodioShare";

const EditSidebar = (props) => {

    // console.log(props.val)

    return (
        <>
            <div className="content_box">

                <Category />
                <CodioShare/>
                
            </div>

        </>
    )
}

export default EditSidebar