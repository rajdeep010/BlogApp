import Latestblog from './Latestblog'
import './latestblog.scss'
import uniqid from 'uniqid'
import { database } from '../../firebase'
import { onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react'
import Dummy from '../card/Dummy'


const Latest = () => {

    const [arr, setArr] = useState([])

    const shuffle = (arr) => {
        return arr.sort(() => Math.random - 0.5)
    }

    useEffect(() => {
        let ans = []
        onValue(ref(database, 'blogs/'), (snapshot) => 
        {
            let now = []

            if (snapshot) {
                const all = snapshot.val()
                const blogs = Object.values(all)
                now = blogs
            }

            let n = now.length
            
            if(n > 5)
                now = now.slice(n - 5, n)

            now.reverse()
            ans = now
            setArr(ans)
        })
    }, [])

    return (
        <>
            {/* Latest Blogs Section */}
            <section className="latest_blogs">

                <div className="heading">
                    <p>LATEST BLOGS</p>
                </div>

                <div className="blogs_container">

                {arr.length > 0 && arr.map((each) => (
                    <Latestblog value={each} key={uniqid()} />
                ))}

                {arr.length === 0 && <Dummy message={'No Latest Blogs'} />}

                </div>

            </section>
        </>
    )
}

export default Latest