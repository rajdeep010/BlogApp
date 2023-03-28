import './creator.scss'

const Creator = () => {
    return (
        <>

            <div className="creator_info">

                <div className="creator_image">
                    <img src="../../../public/images/vite.svg" alt="creator" />
                </div>

                <div className="creator_details">

                    <div className="creator_name">
                        <p>Cory Doctorow</p>
                    </div>

                    <div className="creator_about">
                        Guardian at LeetCode, Master at Codeforces, 6* at Codechef
                    </div>

                </div>

                <div className="follow_button">
                    <button>Follow</button>
                </div>

            </div>
        </>
    )
}

export default Creator