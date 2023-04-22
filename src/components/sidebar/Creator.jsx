import Button from '../button/Button'

import './creator.scss'

const Creator = (props) => {

    const detail = props.value

    const name = detail.name
    const about = detail.about

    return (
        <>
            <div className="creator_info">

                <div className="creator_image">
                    <img src="../../../public/images/vite.svg" alt="creator" />
                </div>

                <div className="creator_details">
                    <div className="creator_name"><p>{name}</p></div>
                    <div className="creator_about">{about}</div>
                </div>

                <div className="follow_button">
                    <Button value={'FOLLOW'} />
                </div>

            </div>
        </>
    )
}

export default Creator