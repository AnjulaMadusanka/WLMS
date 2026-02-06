import React, { useState, useEffect } from "react";
import TextInputComponent from "../../../component/atom/Inputs/TextInput";
import TextButtonComponet from "../../../component/atom/Buttons/TextButton";
import { Box } from "@mui/material";
import IconButtonComponent from "../../atom/Buttons/IconButton";
import { EMAIL_REGEX, USER_ROLE, getText } from "../../../core/Constant";
import { useDispatch } from "react-redux";
import { Actions } from "../../../core/modules/Actions";

const ForgotPasswordForm = ({ onNext = () => { }, onBack = () => { } }) => {
    const [userType, setUserType] = useState(1);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [emailError, setEmailError] = useState(false);

    useEffect(() => {
        getUserType()
    }, []);

    const getUserType = async () => {
        const type = localStorage.getItem('userType');
        setUserType(type)
    };


    const onSendCode = () => {
        if(isEmailValid){
            dispatch(Actions.auth.forgotPassword({email}))
        }else{
            setEmailError(true)
        }
        // 
        // onNext()
    }

    const onEmailChange = (e) => {
        const text = getText(e);
        let isValid = false;
        const reg = EMAIL_REGEX
        if (text.trim().length > 3) {
            isValid = reg.test(text.trim());
        }
        setEmail(text);
        setEmailError(false);
        setIsEmailValid(isValid);
    }

    return (<Box >
        <Box>
            <IconButtonComponent onclick={() => { onBack(false) }} btnType="backbtn" btnText="Back" />
        </Box>
        <form>
            <Box className="forgot-pw-main-container">
                <h2 style={{
                    color: "black",
                    fontSize: 37,
                    fontWeight: 700,
                    textAlign: "center"
                }}>Forgot Password</h2>

                <Box>
                    <TextInputComponent
                        error={'Please add valid email'}
                        isError={emailError} value={email} onchange={onEmailChange} type="text" label="Email" placeholder={"Enter user email address"} />
                </Box>
                <Box>
                    <TextButtonComponet onButtonClick={onSendCode} text="Send code" width="100%" />
                </Box>

                {/* <Box className="sign-in-sign-up-text-wrap">
                    <Box><p className="sign-in-sign-up-text" style={{cursor:'pointer'}} onClick={()=>onBack(false)}>Sign In</p></Box>
                    {userType == USER_ROLE.student ?
                        <>
                            <Box><p style={{ color: "#778FA7", fontSize: 16, fontWeight: 500 }}>OR</p></Box>
                            <Box><p className="sign-in-sign-up-text">Sign Up</p></Box>
                        </> :
                        null

                    }
                </Box> */}
            </Box>

        </form>

    </Box>)
}

export default ForgotPasswordForm;