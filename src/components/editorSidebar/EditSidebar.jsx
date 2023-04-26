import './editSidebar.scss'

import Category from "./Category"
import CodioShare from "./CodioShare";

const EditSidebar = () => {

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