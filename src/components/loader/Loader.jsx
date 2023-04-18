import { Triangle } from "react-loader-spinner"


const Loader = () => {
    return (
        <Triangle
            height="100"
            width="100"
            color="#11d7ff"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
        />
    )
}

export default Loader