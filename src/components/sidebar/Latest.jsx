import Latestblog from './Latestblog'
import './latestblog.scss'

import { database } from '../../firebase'
import { onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react'

const Latest = () => {

    const [arr, setArr] = useState([])

    useEffect(() => {
        onValue(ref(database, 'blogs/'), (snapshot) => {
            let now = []
            if (snapshot) 
            {
                const all = snapshot.val()
                const blogs = Object.values(all)
                now = blogs
            }

            let n = now.length
            let tempArr = now.slice(n-5, n)
            tempArr.reverse()
            setArr(tempArr)
        })

        // console.log(arr)
    },[])

    return (
        <>
            {/* Latest Blogs Section */}
            <section className="latest_blogs">

                <div className="heading">
                    <p>LATEST BLOGS</p>
                </div>

                <div className="blogs_container">

                {arr.map((each) => (
                    <Latestblog value={each} />
                ))}

                </div>

            </section>
        </>
    )
}

export default Latest