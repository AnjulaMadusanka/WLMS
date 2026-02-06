import React, { useEffect, useState } from "react";
import { Box, DialogActions, DialogContent } from "@mui/material";
import { PhoneNumberComponent, TextInputComponent } from "../../../atom";
import DropDownComponent from "../../../atom/Inputs/DropDown";
import TextButtonComponet from "../../../atom/Buttons/TextButton";
import { useDispatch } from 'react-redux';
import { Actions } from "../../../../core/modules/Actions";
import { EMAIL_REGEX, PHONE_REGEX, emptyDropDown, getText, setText } from "../../../../core/Constant";



const AddUserForm = ({ type, onclickcancel }) => {
    const dispatch = useDispatch();
    const genderArr = [{ id: 1, name: "Male" }, { id: 2, name: "Female" }];
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const [fName, setFName] = useState('');
    const [isFNameValid, setIsFNameValid] = useState(false);
    const [fNameError, setFNameError] = useState(false);

    const [phone, setPhone] = useState('');
    const [isPhoneValid, setIsPhoneValid] = useState(false);
    const [phoneError, setPhoneError] = useState(false);

    const [gender, setGender] = useState("");
    const [isGenderValid, setIsGenderValid] = useState(false);
    const [genderError, setGenderError] = useState(false);

    const [lName, setLName] = useState('');
    const [isLNameValid, setIsLNameValid] = useState(false);
    const [lNameError, setLNameError] = useState(false);

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
        setEmailError(false);
    }

    const onPhoneChange = (text) => {
        setPhone(text);
        let isValid = false;
        if (text?.length > 3) {
            isValid = PHONE_REGEX.test(text.trim());
        }
        setIsPhoneValid(isValid);
        setPhoneError(false)
    }

    const onChangeGender = (e) => {
        const text = getText(e);
            setGender(text);
            setGenderError(false);
            setIsGenderValid(true)
    
       
    }

    const onClose = () => {
         onclickcancel();
        onChangeFirstName(setText(''));
        onEmailChange(setText(''));
        onChangeLastName(setText(''));
        onPhoneChange('');
        setIsGenderValid(false);
        setGenderError(false);
        document.getElementById('dropDown').value = 0
         setGender(0);
        //    emptyDropDown(document.getElementById('dropDown'))
    }

    const handleSubmit = () => {
        if (isLNameValid && isFNameValid && isPhoneValid && isEmailValid && isGenderValid) {
            dispatch(Actions.users.createAdminUser({
                first_name: fName,
                last_name: lName,
                email,
                gender,
                phone_number: phone
            }));
            onClose();
        } else {
            if (!isGenderValid) {
                setGenderError(true)
            }
            if (!isEmailValid) {
                setEmailError(true)
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
        <Box p={1}>
            <form >
                <DialogContent>
                    <Box>
                        <TextInputComponent
                            label={"First Name"}
                            name="firstName"
                            value={fName}
                            onchange={onChangeFirstName}
                            placeholder="First Name"
                            readOnly={false}
                            isError={fNameError}
                            error={'please add valid first name'}

                        />


                        <TextInputComponent
                            label={"Last Name"}
                            name="lastName"
                            value={lName}
                            onchange={onChangeLastName}
                            placeholder="Last Name"
                            readOnly={false}
                            isError={lNameError}
                            error={'Please add valid last name'}
                        />

                        <TextInputComponent
                            label={"Email"}
                            name="email"
                            value={email}
                            onchange={onEmailChange}
                            placeholder="Email"
                            readOnly={false}
                            isError={emailError}
                            error={'Please add valid email'}
                        />


                        <PhoneNumberComponent
                            label={"Phone Number"}
                            name="phoneNumber"
                            value={phone}
                            placeholder="Phone Number"
                            onChange={onPhoneChange}
                            defaultCountry="CA"
                            readOnly={false}
                            isError={phoneError}
                            error={'Please add valid phone'}
                        />

                        <DropDownComponent
                            isShowZero={false}
                            isError={genderError}
                            error={'Please select gender'}
                            readOnly={false}
                            name="gender"
                            initialValue="Gender"
                            selectedValue={gender}
                            onchange={onChangeGender}
                            list={genderArr}
                            dropdownLabel="Gender" />

                    </Box>
                </DialogContent>

                <DialogActions>
                    <Box sx={{ display: "flex", width: "50%", mr: 2.2, mb: 2, ml: 2.2 }}>
                        <Box sx={{ display: "flex", gap: 0.5, flexGrow: 1 }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <TextButtonComponet text="Add" classStyle="btn btn-primary"
                                    onButtonClick={handleSubmit}
                                />
                            </Box>
                            <Box sx={{ flexGrow: 1 }}>
                                <TextButtonComponet text="Cancel" classStyle="btn btn-secondary" onButtonClick={() => {
                                    onClose()
                                }} />
                            </Box>
                        </Box>

                    </Box>
                </DialogActions>
            </form>

        </Box>
    );
}

export default AddUserForm;
