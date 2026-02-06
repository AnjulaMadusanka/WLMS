import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react"
import Grid from '@mui/material/Grid';
import { PhoneNumberComponent, TextInputComponent, TopTab } from "../../../component/atom";
import TextButtonComponet from "../../atom/Buttons/TextButton";
import { useSelector, useDispatch } from "react-redux";
import { EMAIL_REGEX, USER_ROLE, getText, setText } from "../../../core/Constant";
import _ from "lodash";
import moment from "moment";
import { Actions } from "../../../core/modules/Actions";
import { parsePhoneNumber, isPossiblePhoneNumber, isValidPhoneNumber } from 'react-phone-number-input'

export default forwardRef(
    ({ isEdit = false, file = null }, ref) => {

        const [fName, setFName] = useState('');
        const [isFNameValid, setIsFNameValid] = useState(false);
        const [fNameError, setFNameError] = useState(false);

        const [lName, setLName] = useState('');
        const [isLNameValid, setIsLNameValid] = useState(false);
        const [lNameError, setLNameError] = useState(false);

        const [email, setEmail] = useState('');
        const [isEmailValid, setIsEmailValid] = useState(false);
        const [emailError, setEmailError] = useState(false);

        const [joinedDate, setJoinedDate] = useState('');

        const [userType, setUserType] = useState(1);

        const [phone, setPhone] = useState('');
        const [isPhoneValid, setIsPhoneValid] = useState(false);
        const [phoneError, setPhoneError] = useState(false);
        const [countryCode, setCountryCode] = useState("+1");

        const dipatch = useDispatch();

        useImperativeHandle(ref, () => ({
            onPress(data) {
                onUploadImage(data);
            },


        }))


        const currentUser = useSelector(state => state.profile.get('currentUser'));

        useEffect(() => {
            const type = localStorage.getItem('userType');
            setUserType(type)
            onChangeFirstName(setText(_.get(currentUser, 'first_name', '')));
            onChangeLastName(setText(_.get(currentUser, 'last_name', '')));
            onEmailChange(setText(_.get(currentUser, 'email', '')));
            onPhoneChange(_.get(currentUser, 'whatsapp_phone_number', ''))
            if (type === USER_ROLE.student) {
                setJoinedDate(moment(new Date(_.get(currentUser, 'created_at', ''))).format('DD-MM-YYYY'))
            } else {
                setJoinedDate(moment(_.get(currentUser, 'created_at', ''), 'DD/MM/YYYY HH:mm:ss').format('DD-MM-YYYY'))
            }
        }, [currentUser])


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
        };

        const onUploadImage = ({ file, isUpload }) => {
    
            if (isEmailValid && isFNameValid && isLNameValid && (userType == 1 && isPhoneValid || userType != 1)) {
                const fd = new FormData();
                fd.append('id', _.get(currentUser, 'id', ''))
                fd.append('first_name', fName)
                fd.append('last_name', lName)
                fd.append('email', email)
                fd.append('phone_number', '')
                if (userType == 1) {
              
                    fd.append('whatsapp_country_code', countryCode)
                    fd.append('whatsapp_phone_number', phone)
                }


                if (isUpload) {
                    fd.append('profile_image', file)
                }
                
                dipatch(Actions.profile.onProfileUpdate(fd));
            } else {
                if (!isEmailValid) {
                    setEmailError(true)
                }
                if (!isFNameValid) {
                    setFNameError(true)
                }
                if (!isLNameValid) {
                    setLNameError(true)
                }
            }

        }

        const onPhoneChange = (text) => {
            setPhone(text);
            let isValid = false;
            if (text?.length > 3) {
                //  isValid = PHONE_REGEX.test(text.trim());
                const phoneData = parsePhoneNumber(text)
                isValid = isPossiblePhoneNumber(text) && isValidPhoneNumber(text)
                setCountryCode(`+${_.get(phoneData, "countryCallingCode")}`)
            }else if(text?.length==1 && text != "+"){
                setPhone('+1')
            }

            setIsPhoneValid(isValid);
            setPhoneError(false)
        }

        return (
            <>
                <Grid style={{ paddingRight: "5px" }} container rowSpacing={3} columnSpacing={{ xs: 3, sm: 3, md: 3 }}>
                    <Grid item xs={12} sm={6}>
                        <TextInputComponent
                            isError={fNameError}
                            error="Please add valid name"
                            onchange={onChangeFirstName} readOnly={!isEdit} value={fName} label={"First name"} placeholder="First name" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextInputComponent
                            isError={lNameError}
                            error="Please add valid name"
                            onchange={onChangeLastName} readOnly={!isEdit} value={lName} label={"Last name"} placeholder="Last name" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextInputComponent
                            isError={emailError}
                            error="Please add valid email"
                            onchange={onEmailChange} readOnly={!isEdit} value={email} label={"Email address"} placeholder="Email address" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextInputComponent readOnly={true} value={joinedDate} label={"Joined date"} placeholder="Joined date" />
                    </Grid>
                    {userType == 1 ? <Grid item xs={12}>
                        <PhoneNumberComponent
                            label={"WhatsApp/Phone Number"}
                            name="phoneNumber"
                            value={phone}
                            placeholder="WhatsApp/Phone Number"
                            onChange={onPhoneChange}
                            defaultCountry="CA"
                            readOnly={!isEdit}
                            isError={phoneError}
                            error={'Please add valid WhatsApp/phone number'}
                        />
                    </Grid> : null}
                </Grid>

            </>
        )
    }
)