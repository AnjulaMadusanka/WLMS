const CourseButton = ({ text='', width, color, onButtonClick, classStyle = "btn btn-dashboard-course", backgroundColor }) => {
    return (<>
        <button className={classStyle} onClick={onButtonClick} style={{ width: width, color: color, backgroundColor: backgroundColor, fontFamily: "Montserrat, sans serif", fontWeight: 600 }}>{text}</button>
    </>)
}
export default CourseButton;