
import Latestblog from './Latestblog'

import './latestblog.scss'

const Latest = () => {
    return (
        <>
            {/* Latest Blogs Section */}
            <section className="latest_blogs">

                <div className="heading">
                    <p>LATEST BLOGS</p>
                </div>

                <div className="blogs_container">

                    <Latestblog/>
                    <Latestblog/>
                    <Latestblog/>
                    <Latestblog/>
                    <Latestblog/>

                </div>

            </section>
        </>
    )
}

export default Latest