import React, { useState } from "react";
import { Box } from "@mui/material";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
// const TextInputComponent = ({isError = false, error = '', backgroundColor = '#f2f6f8', placeholder = '', type = 'text', value = '', onchange = () => { }, name = '', label = '', readOnly = false, min=0, borderStyle="none"}) => {
//     return (<Box style={{padding:10}}>
//         <p style={{ padding: 0, margin: 0, marginBottom:10, color: "#4E657C", fontSize: 19, fontWeight: 700 }}>{label}</p>
//         <input  maxLength="255" className="form-control" style={{backgroundColor:backgroundColor, borderStyle:borderStyle, borderWidth:1, borderColor:'#bdbebf'}} value={value} type={type} placeholder={placeholder} onChange={onchange} readOnly={readOnly} name={name} min={min} />
//         {isError ? <p className="input-error-text">{error}</p> : null}
//     </Box>);
// }

const TextInputComponent = ({
    isError = false,
    error = '',
    backgroundColor = '#f2f6f8',
    placeholder = '',
    type = 'text',
    value = '',
    onchange = () => { },
    name = '',
    label = '',
    readOnly = false,
    min = 0,
    borderStyle = 'none',
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev);
    };
 
    const inputType = type === 'password' && !isPasswordVisible ? 'password' : type;

    return (
        <Box style={{ padding: 10 }}>
            <p style={{ padding: 0, margin: 0, marginBottom: 10, color: '#4E657C', fontSize: 19, fontWeight: 700 }}>
                {label}
            </p>
            <div style={{ position: 'relative' }}>
                <input
                    maxLength="255"
                    className="form-control"
                    style={{
                        backgroundColor: backgroundColor,
                        borderStyle: borderStyle,
                        borderWidth: 1,
                        borderColor: '#bdbebf',
                        paddingRight: type === 'password' ? '30px' : '10px', // Add space for button
                    }}
                    value={value}
                    type={inputType}
                    placeholder={placeholder}
                    onChange={onchange}
                    readOnly={readOnly}
                    name={name}
                    min={min}
                />
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        style={{
                            position: 'absolute',
                            right: 10,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: 16,
                            color: '#4E657C',
                        }}
                    >
                        {isPasswordVisible ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                    </button>
                )}
            </div>
            {isError ? <p className="input-error-text">{error}</p> : null}
        </Box>
    );
};


export default TextInputComponent;