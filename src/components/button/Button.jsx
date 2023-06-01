import '../../styles/button.scss'

const Button = (props) => {

    return (
        <>
            <button className={'button '+ props.value.toLowerCase()}>
                {props.value}
            </button>
        </>
    )
}

export default Button