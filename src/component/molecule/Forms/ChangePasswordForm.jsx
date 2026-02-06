import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react"
import Grid from '@mui/material/Grid';
import { TextInputComponent, TopTab } from "../../../component/atom";
import TextButtonComponet from "../../atom/Buttons/TextButton";
import { MINIMUM_PASSWORD_CHARACTERS, PASSWORD_REGEX, getText, setText } from "../../../core/Constant";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "../../../core/modules/Actions";

export default forwardRef(
    ({ isEdit = false }, ref) => {
        const dipatch = useDispatch();
        // values
        const [oldPassword, setOldPassword] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        // validate
        const [isOldPasswordValid, setIsOldPasswordValid] = useState(false);
        const [isPasswordValid, setIsPasswordValid] = useState(false);
        const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
        // Errorss
        const [showOldPWError, setShowOldPWError] = useState(false);
        const [errorPassword, setPasswordError] = useState(false);
        const [ConfirmPasswordError, setConfirmPasswordError] = useState(false);


        const onOldPasswordTextChange = (e) => {
            const text = getText(e)
            let isValid = false;
            isValid = text.trim().length > MINIMUM_PASSWORD_CHARACTERS;
            setIsOldPasswordValid(isValid);
            setOldPassword(text);
            setShowOldPWError(false);
        };

        const onChangeConfirmPassword = (e) => {
            const text = getText(e)
            setConfirmPassword(text);
            setConfirmPasswordError(false)

            let isValid = false;
            if (new String(text).valueOf() === new String(password).valueOf()) {
                isValid = true;
            }
            setIsConfirmPasswordValid(isValid)
        }

        const onPasswordChange = (e) => {
            const text = getText(e);
            let isMoreThanEight = false, isASpecialCharacter = false, isANumber = false, isCapitalLetter = false, isSimpleLetter = false;
            let isValid = false;

            if (text.trim().length > MINIMUM_PASSWORD_CHARACTERS) {
                isMoreThanEight = true;
                isValid = true
                isValid = PASSWORD_REGEX.test(text.trim());
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

        useImperativeHandle(ref, () => ({
            onPress() {
                onChangePassword();
            },
            onClean

        }))


        const onChangePassword = () => {
            if (isOldPasswordValid && isPasswordValid && isConfirmPasswordValid) {
                dipatch(Actions.profile.changePassword({
                    old_password: oldPassword,
                    password,
                    confirm_password: confirmPassword
                }));
                onClean();
            } else {
                if (!isConfirmPasswordValid) {
                    setConfirmPasswordError(true)
                }
                if (!isPasswordValid) {
                    setPasswordError(true);
                }
                if (!isOldPasswordValid) {
                    setShowOldPWError(true)
                }
            }


        }

        const onClean = () => {
            onPasswordChange(setText(''));
            onOldPasswordTextChange(setText(''));
            onChangeConfirmPassword(setText(''))
        }


        return (
            <>
                <Grid container rowSpacing={3} columnSpacing={{ xs: 3, sm: 3, md: 3 }}>
                    <Grid item xs={12} >
                        <TextInputComponent
                            type={'password'}
                            isError={showOldPWError}
                            error={`Password must be ${MINIMUM_PASSWORD_CHARACTERS + 1} or more characters.`}
                            onchange={onOldPasswordTextChange} value={oldPassword} label={"Current Password"} placeholder="Enter current password here" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextInputComponent
                            type={'password'}
                            isError={errorPassword}
                            error={"The password you entered doesn't meet the minimum requirements"}
                            onchange={onPasswordChange} value={password} label={"New Password"} placeholder="Enter new password here" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextInputComponent
                            type={'password'}
                            isError={ConfirmPasswordError}
                            error={"The new password and confirm password are not matched"}
                            onchange={onChangeConfirmPassword} value={confirmPassword} label={"Confirm New Password"} placeholder="Enter confirm new password here" />
                    </Grid>
                </Grid>

            </>
        )
    }
)