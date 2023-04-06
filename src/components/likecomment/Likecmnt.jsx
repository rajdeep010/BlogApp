import { CiHeart, CiChat1, CiShare2, CiLocationArrow1 } from "react-icons/ci";
import { useState } from "react";


import '../../styles/likecmnt.scss'

const Likecmnt = () => {

    const [like, setLike] = useState(0)
    const [done, setDone] = useState(false)

    const [cmnt, setCmnt] = useState(0)

    const updateComment = () => {
        setCmnt(cmnt+1)
    }

    const updateLike = () => 
    {
        if(done)
            setLike(like-1)
        
        else
            setLike(like+1)

        done = (done == 0) ? setDone(1) : setDone(0)
    }

    return (
        <>
            <section className="lc-container">

                <div className="icons">

                    <button className="like-box-icons" onClick={updateLike}>
                        <div className="each-icon">
                            <CiHeart className="icon"style={(done === true) ? {'color' : 'red'} : {'color' : 'none'}}/>
                        </div>

                        <div className="count">
                            {like}
                        </div>
                    </button>

                    <button className="like-box-icons" onClick={updateComment}>
                        <div className="each-icon">
                            <CiChat1 className="icon" />
                        </div>

                        <div className="count">
                            {cmnt}
                        </div>
                    </button>

                    <button className="like-box-icons">
                        <div className="each-icon">
                            <CiShare2 className="icon" />
                        </div>
                    </button>
                </div>


                {/* Comment writing part */}

                <div className="comment-container">

                    <div className="cmntbox">
                        <div className="comment-input-box">
                            <input type="text" className="cmnt-input" placeholder="Write Your Comment..." />
                        </div>

                        <div className="comment-submit-button">
                            <button className="like-box-icons"> <CiLocationArrow1 /> </button>
                        </div>
                    </div>

                    {/* Comment more comments */}
                    <div className="comments">

                        <div className="cmnt">
                            <div className="person-img">
                                <img src="../../public/vite.svg" alt="img" />
                            </div>

                            <div className="person-cmnt">
                                Your apporach is very good for this problem..
                            </div>
                        </div>

                        <div className="cmnt">
                            <div className="person-img">
                                <img src="../../public/vite.svg" alt="img" />
                            </div>

                            <div className="person-cmnt">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores alias placeat accusantium. Et ratione adipisci, ipsa est repellendus, eligendi, veritatis nemo laborum error similique sunt neque vero voluptatem reprehenderit nulla.
                            </div>
                        </div>

                        <div className="cmnt">
                            <div className="person-img">
                                <img src="../../public/vite.svg" alt="img" />
                            </div>

                            <div className="person-cmnt">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi libero ea ullam iure! Quod, aspernatur a libero numquam dolorem consequatur itaque recusandae nulla distinctio error animi! Veniam maxime quae doloribus eos recusandae nemo, alias est consectetur iusto aliquam sed molestias voluptates voluptatem libero hic rerum soluta ut, sunt assumenda ipsam. Aliquam corporis nemo sequi architecto voluptates, ullam nam vel enim accusamus officia inventore, dolore repudiandae non ratione, quaerat provident autem.
                            </div>
                        </div>

                    </div>
                </div>


            </section>
        </>
    )
}

export default Likecmnt