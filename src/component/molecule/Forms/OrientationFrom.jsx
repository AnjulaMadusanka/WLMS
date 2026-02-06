import React, { useEffect, useState } from "react";
import { Box, Button, DialogActions, DialogContent } from "@mui/material";
import TextInputComponent from "../../atom/Inputs/TextInput";
import TextButtonComponet from "../../atom/Buttons/TextButton";
import DropDownComponent from "../../atom/Inputs/DropDown";
import { MINIMUM_PASSWORD_CHARACTERS, USER_ROLE, EMAIL_REGEX, getText } from "../../../core/Constant";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Actions } from "../../../core/modules/Actions";



const OrientaionForm = ({ item = {}, course_id,onClose = () => { } }) => {
    const [scroll, setScroll] = useState('paper');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [emailError, setEmailError] = useState(false);
   
    const [fName, setFName] = useState('');
    const [isFNameValid, setIsFNameValid] = useState(false);
    const [fNameError, setFNameError] = useState(false);

    const [phone ,setPhone] = useState('');
    const [isPhoneValid, setIsPhoneValid] = useState(false);
    const [phoneError, setPhoneError] = useState(false);

    const [message, setMessage] = useState('');
    const [isMessageValid, setIsMessageValid] = useState(false);
    const [messageError, setMessageError] = useState(false);

    const onChangeFirstName = (e) => {
        const text = getText(e)
        setFName(text);
        setFNameError(false);
        setIsFNameValid(text?.length > 0)
    }

    const onChangePhone = (e) => {
        const text = getText(e)
        setPhone(text);
        setPhoneError(false);
        setIsPhoneValid(text?.length > 0)
    }

    const onChangeMessage = (e) => {
        const text = getText(e)
        setMessage(text);
        setMessageError(false);
        setIsMessageValid(text?.length > 0)
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


    const onFreeOrientation = async () => {
        if (isEmailValid && isFNameValid && isPhoneValid && isMessageValid) {
            const data = {
                course_id,
                name: fName,
                email: email,
                phone: phone,
                message: message,
                ...item
            };
            dispatch(Actions.guest.setFreeOrientaion(data));
            onClose();
        } else {
            if (!isEmailValid) {
                setEmailError(true)
            }
            if (!isPhoneValid) {
                setPhoneError(true)
            }
            if (!isFNameValid) {
                setFNameError(true)
            }
            if (!isMessageValid) {
                setMessageError(true)
            }
        }
    }

   useEffect(()=>{
     course_id = item.id
   },[]);
   
    return (
        <>
            <form >
                <DialogContent>
                    <Box>
                    <p className="signup-title">Please  Enter the details to request<span style={{ color: '#28b882' }}> free orientation</span></p>
                        <Box sx={{display:'flex',flexDirection:'row',width:1,justifyContent:'space-between'}}>
                        <Box sx={{flexGrow:1,marginRight:2}}>
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
<Box sx={{flexGrow:1}}>
                        <TextInputComponent
                                   label={"Phone"}
                                   placeholder="Enter your phone number"
                                   value={phone}
                                   onchange={onChangePhone}
                                   error="Please add your phone number"
                                   isError={phoneError}
                        />
                        </Box>
                        </Box>
                        <TextInputComponent
                                  label={"Email"}
                                  placeholder="Enter your email address"
                                  value={email}
                                  onchange={onEmailChange}
                                  error="Please add valid email"
                                  isError={emailError}
                        />

<TextInputComponent
                           label={"Message"}
                           placeholder="Enter your message"
                           value={message}
                           onchange={onChangeMessage}
                           error="Please add Message"
                           isError={messageError}
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ mr: 2 , mb:2}}>
                    <Box sx={{ display: "flex", gap: 5,width:1,justifyContent:'center',flexDirection:'row',alignItems:'center',padding:2}}>
                    <TextButtonComponet text={"Cancel"} classStyle="btn btn-secondary" width={120} onButtonClick={() => onClose()} />
                        <TextButtonComponet text={"Send"} width={120} onButtonClick={() => onFreeOrientation()} />
                    </Box>

                </DialogActions>
            </form>

        </>
    );
}

export default OrientaionForm;
