import { Box } from "@mui/material";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = (props) => {
   const {label, isError, error} = props;
//   console.log(props, "new Date()", new Date("20124/03/10"),"ooooo")
return(<Box style={{padding:10}}>
        <p style={{ padding: 0, margin: 0, marginBottom:10, color: "#4E657C", fontSize: 19, fontWeight: 700 }}>{label}</p>
    <DatePicker minDate={new Date("2024/03/10")} className=" form-control" {...props} />
    {isError ? <p className="input-error-text">{error}</p> : null}
</Box>);
}



// const DatePickerComponent = ({label, isError, error, selected, onChange=()=>{}, selectsStart= false, selectsEnd= false, startDate = new Date("2014/02/08"), endDate = new Date("2014/02/08"), minDate=""}) => {
//     return(<Box style={{padding:10}}>
//             <p style={{ padding: 0, margin: 0, marginBottom:10, color: "#4E657C", fontSize: 19, fontWeight: 700 }}>{label}</p>
//         <DatePicker minDate={minDate} startDate={startDate} endDate={endDate} selected={selected} selectsStart={selectsStart} selectsEnd={selectsEnd} onChange={onChange} className=" form-control " />
//         {isError ? <p className="input-error-text">{error}</p> : null}
//     </Box>);
//     }
    



export default DatePickerComponent;