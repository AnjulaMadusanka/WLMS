import React, { useState } from "react";
import TextInputComponent from "../../../component/atom/Inputs/TextInput";
import TextButtonComponet from "../../../component/atom/Buttons/TextButton";
import { Box } from "@mui/material";
import IconButtonComponent from "../../atom/Buttons/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "../../../core/modules/Actions";
import { MINIMUM_PASSWORD_CHARACTERS, getText } from "../../../core/Constant";

const VerifyEmailForm = ({ onBack = () => { }, onNext = () => { } }) => {
    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState(false);
    const [otpValid, setOtpValid] = useState(false)

    const resetData = useSelector(state => state.auth.get('resetData'));

    const dispatch = useDispatch();

    const onVerify = () => {
        if (otpValid) {
            dispatch(Actions.auth.verifyEmailForReset({ ...resetData, otp }))
        } else {
            setOtpError(true)
        }
        // 
        // onNext()
    }

    const onOtpChange = (e) => {
        const text = getText(e);
        setOtp(text);
        setOtpValid(text?.length > 2);
        setOtpError(false)
    }



    return (<Box >
        <Box>
            <IconButtonComponent onclick={() => { onBack(false) }} btnType="backbtn" btnText="Back" />
        </Box>
        <form>
            <Box className="forgot-pw-main-container">
                <Box>
                    <h2 style={{
                        color: "black",
                        fontSize: 37,
                        fontWeight: 700,
                        textAlign: "center"
                    }}>Verify Email</h2>
                    <p style={{ color: "#4E657C", fontWeight: 500, fontSize: 20, textAlign: "center" }}>We have sent a code to your <br /> email address</p>
                </Box>


                <Box>
                    <TextInputComponent isError={otpError} error="Please add valid otp" value={otp} onchange={onOtpChange} type="text" label="Code" placeholder={"Enter your code"} />
                </Box>
                <Box>
                    <TextButtonComponet onButtonClick={onVerify} text="Verify" width="100%" />
                </Box>

                {/* <Box className="sign-in-sign-up-text-wrap">
                    <Box><p className="sign-in-sign-up-text">Sign In</p></Box>
                    <Box><p style={{ color: "#778FA7", fontSize: 16, fontWeight: 500 }}>OR</p></Box>
                    <Box><p className="sign-in-sign-up-text">Sign Up</p></Box>
                </Box> */}
            </Box>

        </form>

    </Box>)
}

export default VerifyEmailForm;