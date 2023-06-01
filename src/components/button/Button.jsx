import '../button/button.scss'

const Button = (props) => {

    // const str = props.value


    return (
        <>
            <button className={'button '+ props.value.toLowerCase()}>
                {props.value}
            </button>
        </>
    )
}

export default Button