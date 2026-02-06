import React, { useEffect, useState } from "react";
import { Box, DialogActions, DialogContent } from "@mui/material";
import TextInputComponent from "../../atom/Inputs/TextInput";
import TextButtonComponet from "../../atom/Buttons/TextButton";
import DropDownComponent from "../../atom/Inputs/DropDown";
import { useDispatch } from 'react-redux';
import { Actions } from "../../../core/modules/Actions";
import { EMAIL_REGEX } from "../../../core/Constant";
import { useLocation } from "react-router-dom";
import { PhoneNumberComponent } from "../../atom";
import { parsePhoneNumber, isPossiblePhoneNumber, isValidPhoneNumber } from 'react-phone-number-input'
import _ from "lodash";



const AddStudentForm = ({ onclickcancel, dropdownList }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [studentFormData, setStudentFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        course_id: ""
    });
    const [errors, setErrors] = useState({
        first_name: "",
        last_name: "",
        email: "",
        course_id: ""
    });

       const [phone, setPhone] = useState('');
        const [isPhoneValid, setIsPhoneValid] = useState(false);
        const [phoneError, setPhoneError] = useState(false);
        const [countryCode, setCountryCode]=useState("+1");

    useEffect(() => {

    }, [errors]);

    const emptyFormfields = () => {
        setStudentFormData({
            first_name: "",
            last_name: "",
            email: "",
            course_id: ""
        })
        setPhone('')
        setCountryCode('+1')
    }


    const validateForm = () => {
        const newErrors = {
            first_name: "",
            last_name: "",
            email: "",
            course_id: ""
        };
        const reg = EMAIL_REGEX;

        if (!studentFormData?.first_name.trim()) {
            newErrors.first_name = "First Name is required";
        }

        if (!studentFormData?.last_name.trim()) {
            newErrors.last_name = "Last Name is required";
        }

        if (!studentFormData?.email.trim()) {
            newErrors.email = "Email is required";
        }
        else if (!reg.test(studentFormData?.email.trim())) {
            newErrors.email = "Invalid email format";
        }
        if (!studentFormData?.course_id) {
            newErrors.course_id = "Course is required";
        }
        if (!isPhoneValid) {
            setPhoneError(true)

        }

        setErrors(newErrors);

        // Return true if there are no errors
        return Object.values(newErrors).every(error => !error);
    }

    const handleChange = async (name, value) => {
        setStudentFormData({
            ...studentFormData,
            [name]: value,
        });
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            dispatch(Actions.students.createAdminStudent({
                first_name: studentFormData?.first_name,
                last_name: studentFormData?.last_name,
                email: studentFormData?.email,
                course_id:studentFormData?.course_id,
                whatsapp_country_code:countryCode,
                whatsapp_phone_number:phone,
                phone_number:phone,
                currency_id:"1"
            }));
            onclickcancel();
            emptyFormfields();
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Box>
                        <TextInputComponent
                            label={"First Name"}
                            placeholder="First Name"
                            name="first_name"
                            value={studentFormData?.first_name}
                            onchange={(e) => handleChange('first_name', e.target.value)}
                            isError={errors.first_name !== "" ? true : false}
                            error={errors?.first_name}
                        />


                        <TextInputComponent
                            label={"Last Name"}
                            name="last_name"
                            value={studentFormData.last_name}
                            onchange={(e) => handleChange('last_name', e.target.value)}
                            placeholder="Last Name"
                            isError={errors.last_name !== "" ? true : false}
                            error={errors?.last_name}

                        />

                        <TextInputComponent
                            label={"Email"}
                            value={studentFormData.email}
                            placeholder="Email"
                            name="email"
                            onchange={(e) => handleChange('email', e.target.value)}
                            isError={errors.email !== "" ? true : false}
                            error={errors?.email}
                        />
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

                       <DropDownComponent
                            isError={errors.course_id !== "" ? true : false}
                            error={errors?.course_id}
                            isShowZero={false}
                            onchange={(e) => handleChange('course_id', e.target.value)}
                            selectedValue={studentFormData.course_id}
                            list={dropdownList}
                            dropdownLabel="Course" /> 
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
                                    onclickcancel(); emptyFormfields(); setErrors({
                                        first_name: "",
                                        last_name: "",
                                        email: "",
                                        course_id: ""
                                    });
                                }} />
                            </Box>
                        </Box>

                    </Box>
                </DialogActions>

            </form>

        </>
    );
}

export default AddStudentForm;
