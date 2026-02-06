import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import TextInputComponent from "../../atom/Inputs/TextInput";
import TextButtonComponet from "../../atom/Buttons/TextButton";
import { useNavigate } from "react-router-dom";
import {
    MINIMUM_PASSWORD_CHARACTERS,
    USER_ROLE,
    EMAIL_REGEX,
    getText,
    getDeviceId,
} from "../../../core/Constant";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "../../../core/modules/Actions";
import { PasswordInputComponent } from "../../atom";

const ResetDeviceIdForm = ({ onclickcancel=()=>{}}) => {
    //   const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");

    const [isEmailValid, setIsEmailValid] = useState(false);

    const [emailError, setEmailError] = useState(false);


    const onEmailChange = (e) => {
        const text = getText(e);
        let isValid = false;
        const reg = EMAIL_REGEX;
        if (text.trim().length > 3) {
            isValid = reg.test(text.trim());
        }
        setEmail(text);
        setIsEmailValid(isValid);
        setEmailError(false);
    };

    const onResetDeviceId = async () => {
        const device_id = await getDeviceId();
        if (isEmailValid) {
            dispatch(Actions.common.resetDeviceId({ email }));
        } else {
            if (!isEmailValid) {
                setEmailError(true);
            }
        }
        onClean()
    };

    const onClean=()=>{
        onclickcancel()
        setEmail('')
        setIsEmailValid(false)
        setEmailError(false)
    }


    return (
        <Box className="login-form-wrap">
            <Box className="login-form-text-wrap">
                <Box className="login-heading-wrap">
                    <p
                        style={{
                            color: "#4E657C",
                            fontWeight: 500,
                            fontSize: 20,
                            textAlign: "center",
                        }}
                    >
                        Reset Students' Device Id
                    </p>
                </Box>
            </Box>
            <form>
                <Grid spacing={2} style={{ display: 'flex', justifyContent: 'center' }} container>
                    <Grid item xs={10}>
                        <TextInputComponent
                            isError={emailError}
                            error="Please add valid email"
                            value={email}
                            onchange={onEmailChange}
                            type="text"
                            label={"Email"}
                            placeholder={"Enter your email address"}
                        />
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <TextButtonComponet
                            onButtonClick={() => {
                                onResetDeviceId();
                            }}
                            width="100%"
                            text="Reset Device Id "
                        />
                    </Grid>
                    <Grid style={{height: '50px'}} xs={12}>

                    </Grid>

                </Grid>

            </form>
        </Box>
    );
};

export default ResetDeviceIdForm;
