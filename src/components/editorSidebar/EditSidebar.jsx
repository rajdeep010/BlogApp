import './editSidebar.scss'

import Category from "./Category"
import CodioShare from "./CodioShare";

const EditSidebar = () => {

    return (
        <>
            <div className="content_box">

                <div className="element">
                    <Category />
                </div>

                <div className="element">
                    <CodioShare />
                </div>

            </div>

        </>
    )
}

export default EditSidebar