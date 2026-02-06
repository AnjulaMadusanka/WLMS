import React, { useState, useEffect } from "react";
import TextInputComponent from "../../../component/atom/Inputs/TextInput";
import TextButtonComponet from "../../../component/atom/Buttons/TextButton";
import { Box } from "@mui/material";
import IconButtonComponent from "../../atom/Buttons/IconButton";
import { MINIMUM_PASSWORD_CHARACTERS, USER_ROLE, getText } from "../../../core/Constant";
import { useDispatch , useSelector} from "react-redux";
import { Actions } from "../../../core/modules/Actions";


const ResetPasswordForm = ({ onNext = () => { }, goBack = () => { } }) => {
    const [userType, setUserType] = useState(1);
    const dispatch = useDispatch();
    const resetData = useSelector(state => state.auth.get('resetData'));
    const [password, setPassword] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [errorPassword, setPasswordError] = useState(false);
    const [isPasswordSecure, setIsPasswordSecure] = useState(true);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
    const [ConfirmPasswordError, setConfirmPasswordError] = useState(false);
    const [isConfirmPasswordSecure, setIsConfirmPasswordSecure] = useState(true);

    useEffect(() => {
        getUserType()
    }, []);

    const getUserType = async () => {
        const type = localStorage.getItem('userType');
        setUserType(type)
    };

    const onReset = () => {
        if (isPasswordValid && isConfirmPasswordValid) {
            dispatch(Actions.auth.resetPassword({...resetData, password, confirm_password: confirmPassword}))
            onNext()
        } else {
            if (!isPasswordValid) {
                setPasswordError(true)
            }
            if (!isConfirmPasswordValid) {
                setConfirmPasswordError(true)
            }
        }

    }


    const onChangeConfirmPassword = (e) => {
        const text = getText(e);
        setConfirmPassword(text);
        setConfirmPasswordError(false)

        let isValid = false;
        if (new String(text).valueOf() === new String(password).valueOf()) {
            isValid = true;
        }
        setIsConfirmPasswordValid(isValid)
    }

    const onChangePassword = (e) => {
        const text = getText(e);
        // let isValid = text.trim().length > PASSWORD_MINIMUM_CHARACTERS;
        let isMoreThanEight = false, isASpecialCharacter = false, isANumber = false, isCapitalLetter = false, isSimpleLetter = false;

        // if (text?.length > 0) {
        //     isANumber = isNumber(text);
        //     isASpecialCharacter = isSpecialCharacter(text);
        //     isCapitalLetter = isUpperCase(text);
        //     isSimpleLetter = isLowerCase(text)
        // }

        let isValid = false;

        if (text.trim().length > MINIMUM_PASSWORD_CHARACTERS) {
            isMoreThanEight = true;
            isValid = true
            // isValid = PASSWORD_REGEX.test(text.trim());
        }
        setPassword(text);
        setPasswordError(false);
        setConfirmPasswordError(false);

        setIsPasswordValid(isValid)
        let isConfirmeValid = false;
        if (
            new String(text).valueOf() === new String(confirmPassword).valueOf()
        ) {
            isConfirmeValid = true;
        }
        setIsConfirmPasswordValid(isConfirmeValid)
    }

    return (<Box >
        <Box>
            <IconButtonComponent onclick={() => { goBack() }} btnType="backbtn" btnText="Back" />
        </Box>
        <form>
            <Box className="forgot-pw-main-container">
                <Box>
                    <h2 style={{
                        color: "black",
                        fontSize: 37,
                        fontWeight: 700,
                        textAlign: "center"
                    }}>Create New Password</h2>
                    <p style={{ color: "#4E657C", fontWeight: 500, fontSize: 20, textAlign: "center" }}>Your email verified successfully,<br /> please create a password</p>
                </Box>


                <Box>
                    <TextInputComponent error="Please add valid password" isError={errorPassword} onchange={onChangePassword} value={password} type="password" label="New password" placeholder={"Create new password"} />
                    <TextInputComponent errorPassword={"Passoword doesn’t match !"} isError={ConfirmPasswordError} onchange={onChangeConfirmPassword} value={confirmPassword} type="password" label="Confirm Password" placeholder={"Re enter your password"} />
                </Box>
                <Box>
                    <TextButtonComponet onButtonClick={onReset} text="Verify" width="100%" />
                </Box>

                {/* <Box className="sign-in-sign-up-text-wrap">
                    <Box><p className="sign-in-sign-up-text">Sign In</p></Box>
                    {userType == USER_ROLE.student ?
                        <>
                            <Box><p style={{ color: "#778FA7", fontSize: 16, fontWeight: 500 }}>OR</p></Box>
                            <Box><p className="sign-in-sign-up-text">Sign Up</p></Box>
                        </>
                        : null}
                </Box> */}
            </Box>

        </form>

    </Box>)
}

export default ResetPasswordForm;