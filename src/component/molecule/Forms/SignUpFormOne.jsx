import React, { useState, useRef, forwardRef, useImperativeHandle, useEffect } from "react"
import { Box, Typography, DialogActions, DialogContent, Grid } from "@mui/material"
import TextInputComponent from "../../atom/Inputs/TextInput"
import TextButtonComponet from "../../atom/Buttons/TextButton"
import { MINIMUM_PASSWORD_CHARACTERS, USER_ROLE, EMAIL_REGEX, getText, getDeviceId, PASSWORD_REGEX, PHONE_REGEX } from "../../../core/Constant";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Actions } from "../../../core/modules/Actions";
import CardValidator from 'card-validator';
import _ from "lodash";
import PhoneNumberComponent from "../../atom/Inputs/PhoneNumberInput";
import { parsePhoneNumber, isPossiblePhoneNumber, isValidPhoneNumber } from 'react-phone-number-input'

const SignUpFormOne = forwardRef(({ onPassValue = () => { }, isFree = 0, course_id, selectedCurrency, courseType,  onUpdateValue=()=>{} }, ref) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');

    const [password, setPassword] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [errorPassword, setPasswordError] = useState(false);
    const [isPasswordSecure, setIsPasswordSecure] = useState(true);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
    const [ConfirmPasswordError, setConfirmPasswordError] = useState(false);
    const [isConfirmPasswordSecure, setIsConfirmPasswordSecure] = useState(true);

    const [fName, setFName] = useState('');
    const [isFNameValid, setIsFNameValid] = useState(false);
    const [fNameError, setFNameError] = useState(false);

    const [lName, setLName] = useState('');
    const [isLNameValid, setIsLNameValid] = useState(false);
    const [lNameError, setLNameError] = useState(false);

    const [phone, setPhone] = useState('');
    const [isPhoneValid, setIsPhoneValid] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [countryCode, setCountryCode]=useState("+1");

    const verifyEmailData = useSelector(state => state.auth.get("verifyEmailData"));
    
    const [statusIndex, setStatusIndex] = useState(0)

    const [isShow, setIsShow] = useState(0);
    const show = useSelector(state => state.common.get('show'));


    useEffect(() => {

        if (verifyEmailData?.status && verifyEmailData?.status_code == 1) {
            setIsEmailValid(false);
            setEmailError(true)
            setEmailErrorMessage(verifyEmailData?.message)
        } else {
            setIsEmailValid(true);
            setEmailError(false)
        }
        setStatusIndex(0)
    }, [verifyEmailData, statusIndex]);

    

    const onChangeFirstName = (e) => {
        const text = getText(e)
        setFName(text);
        setFNameError(false);
        setIsFNameValid(text?.length > 0)
    }

    const onChangeLastName = (e) => {
        const text = getText(e)
        setLName(text);
        setLNameError(false);
        setIsLNameValid(text?.length > 0)
    }


    const onEmailChange = (e) => {
        const text = getText(e)
        let isValid = false;
        const reg = EMAIL_REGEX;
        if (text.trim().length > 3) {
            isValid = reg.test(text.trim());
        }
        setEmail(text);
        setIsEmailValid(isValid);
        setEmailErrorMessage("Please add valid email")
        setEmailError(false);
        if (isValid) {
            onEmailVerify(text);
            setStatusIndex(1)
        }
    }

    const onEmailVerify = _.debounce((email) => {
        dispatch(Actions.auth.validateEmail({ email }))
    }, 1500);

   

    const onConfirmPassword = (e) => {
        const text = getText(e);
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

    const onPhoneChange = (text) => {
        setPhone(text);
        let isValid = false;
        if (text?.length > 3) {
            //  isValid = PHONE_REGEX.test(text.trim());
            const phoneData= parsePhoneNumber(text)
            isValid = isPossiblePhoneNumber(text) && isValidPhoneNumber(text)
            setCountryCode(`+${_.get(phoneData,"countryCallingCode")}`)
        }

        setIsPhoneValid(isValid);
        setPhoneError(false)
    }



    useImperativeHandle(ref, () => ({
        onPress() {
            onNext();
        }
    }))

    const onNext = () => {
        if (isEmailValid && isPasswordValid && isConfirmPasswordValid && isFNameValid && isLNameValid && isPhoneValid) {
            onPassValue({
                first_name: fName,
                last_name: lName,
                email,
                password,
                confirm_password: confirmPassword,
                is_free: isFree,
                type: 1,
                course_id,
                whatsapp_country_code:countryCode,
                whatsapp_phone_number:phone
            });
            
        } else {
            if (!isEmailValid) {
                setEmailError(true);
            }
            if (!isPasswordValid) {
                setPasswordError(true)
            }

            if (!isConfirmPasswordValid) {
                setConfirmPasswordError(true)
            }
            if (!isPhoneValid) {
                setPhoneError(true)

            }
            if (!isFNameValid) {
                setFNameError(true)

            }
            if (!isLNameValid) {
                setLNameError(true)
            }

        }
    }



    return (
        <>
            <p className="signup-title">Please <span style={{ color: 'rgb(152, 52, 240)' }}>Signup</span> {isShow? "to start purchasing the course": ''}</p>
            
            <Box sx={{ display: 'flex', flexDirection: 'row', width: 1, justifyContent: 'space-between' }}>
                <Box sx={{ flexGrow: 1, marginRight: 2 }}>
                    <TextInputComponent
                        label={"First Name"}
                        placeholder="Enter your first name"
                        value={fName}
                        onchange={onChangeFirstName}
                        type="text"
                        error="Please add your first name"
                        isError={fNameError}

                    />
                </Box>

                <Box sx={{ flexGrow: 1 }}>
                    <TextInputComponent
                        label={"Last Name"}
                        placeholder="Enter your last name"
                        value={lName}
                        onchange={onChangeLastName}
                        error="Please add your last name"
                        isError={lNameError}
                    />
                </Box>
            </Box>
            <PhoneNumberComponent
             label={"WhatsApp/Phone Number"}
             name="phoneNumber"
             value={phone}
             placeholder="WhatsApp/Phone Number"
             onChange={onPhoneChange}
             defaultCountry="CA"
             readOnly={false}
             isError={phoneError}
             error={'Please add valid WhatsApp/phone number'}
            />
            <TextInputComponent
                label={"Email"}
                placeholder="Enter your email address"
                value={email}
                onchange={onEmailChange}
                error={emailErrorMessage}
                isError={emailError}
            />
            <Box sx={{ display: 'flex', flexDirection: 'row', width: 1, justifyContent: 'space-between', marginTop: '22px' }}>
                <Box sx={{ flexGrow: 1, marginRight: 2 }}>
                    <TextInputComponent
                        label={"New Password"}
                        placeholder="Create a password"
                        value={password}
                        onchange={onPasswordChange}
                        type="password"
                        error="Please add valid password"
                        isError={errorPassword}
                    />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <TextInputComponent
                        label={"Confirm Password"}
                        placeholder="Re-enter your password"
                        value={confirmPassword}
                        type="password"
                        onchange={onConfirmPassword}
                        error="Passoword doesn’t match !"
                        isError={ConfirmPasswordError}
                    />
                </Box>
            </Box>

            {/* <Box sx={{ display: 'flex', flexDirection: 'row', width: 1, justifyContent: 'space-between' }}>
               


                
            </Box> */}
            <p className="signup-price-subtext">Note : The password must be minimum of 8 characters with minimum of 1 upper case, 1 lower case, 1 number and a special character.</p>
        </>
    )
})

export default SignUpFormOne;