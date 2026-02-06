const ForumButton = ({ text, width, color, onButtonClick, classStyle = "btn btn-forum", backgroundColor }) => {
    return (<>
        <button className={classStyle} onClick={onButtonClick} style={{ width: width, color: color, backgroundColor: backgroundColor, fontFamily: "Montserrat, sans serif", fontWeight: 600 }}>{text}</button>
    </>)
}
export default ForumButton;