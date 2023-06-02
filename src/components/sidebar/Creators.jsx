import Creator from "./Creator"
import { useEffect, useState } from "react"
import { database } from "../../firebase"
import { onValue, ref } from "firebase/database"
import Dummy from "../card/Dummy"
import uniqid from 'uniqid'




const Creators = () => {

    const [arr, setArr] = useState([])

    useEffect(() => {

        let now = []
        
        onValue(ref(database, 'users/'), (snapshot) => {
            if (snapshot) 
            {
                const all = snapshot.val()

                for (const key of Object.keys(all)) 
                {
                    const obj = all[key].details
                    
                    if (obj.blogCount > 0) 
                    {
                        now.push
                        ({
                            'name': obj.name,
                            'about': obj.about,
                            'authorId': key,
                        })
                    }
                }
                setArr(now)
            }
        })
    }, [])


    return (
        <>
            <section className="creators">

                <div className="heading"><p>WRITERS</p></div>

                {arr.length > 0 && arr.map((each) => (
                    <Creator value={each} key={uniqid()} />
                ))}

                {arr.length === 0 && <Dummy message={'Creators Not Found'} />}

            </section>
        </>
    )
}

export default Creators