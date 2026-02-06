const TextButtonComponet = ({ text, onButtonClick, classStyle = "btn btn-primary",isDisabled = false,style={}}) => {
    return (<>
        <button type="button" className={classStyle} style={style}  onClick={onButtonClick} disabled={isDisabled}>{text}</button>
    </>)
}
export default TextButtonComponet;