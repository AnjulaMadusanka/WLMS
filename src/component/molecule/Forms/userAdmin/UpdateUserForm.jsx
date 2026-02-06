import React, { useEffect, useState } from "react";
import { Box, DialogActions, DialogContent } from "@mui/material";
import { PhoneNumberComponent, TextInputComponent } from "../../../atom";
import DropDownComponent from "../../../atom/Inputs/DropDown";
import TextButtonComponet from "../../../atom/Buttons/TextButton";
import { useDispatch } from 'react-redux';
import { Actions } from "../../../../core/modules/Actions";
import { getText } from "../../../../core/Constant";





const UpdateUserForm = ({ user, onclickcancel }) => {
    const dispatch = useDispatch();
    const [gender, setGender] = useState(0);
    const [userFormData, setUserFormData] = useState({
        firstName: user?.first_name,
        lastName: user?.last_name,
        email: user?.email,
        phoneNumber: user?.phone_number,
        gender: user?.gender
    });

    const genderArr = [{id: 1, name: "Male"}, {id: 2, name: "Female"}];


    useEffect(() => {
    
        setUserFormData({
            firstName: user?.first_name,
            lastName: user?.last_name,
            email: user?.email,
            phoneNumber: user?.phone_number,
            gender: user.gender
        })
        setGender(user.gender)
    }, [user]);

    const handleChange = async (name, value) => {
        setUserFormData({
            ...userFormData,
            [name]: value,
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(Actions.users.updateUser({ 
            id:user?.id,
            first_name:userFormData?.firstName, 
            last_name:userFormData?.lastName,
            email:userFormData?.email,
            gender:gender,
            phone_number: userFormData?.phoneNumber
        }));
        onclickcancel();
        // try {
        //     // await Validation.Employee.validate(employeeData, { abortEarly: false });
        // } catch (validationErrors) {
        //     // const errorsObj = {};
        //     // validationErrors.inner.forEach((error) => {
        //     //     errorsObj[error.path] = error.message;
        //     // });
        //     // if (errorsObj?.firstName || errorsObj?.lastName || errorsObj?.email || errorsObj?.contactNumber || errorsObj?.address) {
        //     //     setErrorMessage("Please insert Employee details before submitting!");
        //     //     setError(true);
        //     // }
        //     // setErrors(errorsObj);
        // }
    };



    return (
        <Box p={1}>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Box>
                        <TextInputComponent
                            label={"First Name"}
                            name="firstName"
                            value={userFormData.firstName}
                            onchange={(e) => handleChange('firstName', e.target.value)}
                            placeholder="First Name"
                            readOnly={false}
                        />


                        <TextInputComponent
                            label={"Last Name"}
                            name="lastName"
                            value={userFormData.lastName}
                            onchange={(e) => handleChange('lastName', e.target.value)}
                            readOnly={false}
                            placeholder="Last Name"
                        />

                        <TextInputComponent
                            label={"Email"}
                            name="email"
                            value={userFormData.email}
                            onchange={(e) => handleChange('email', e.target.value)}
                            placeholder="Email"
                            readOnly={false}
                        />


                        <PhoneNumberComponent
                            label={"Phone Number"}
                            name="phoneNumber"
                            value={userFormData.phoneNumber}
                            placeholder="Phone Number"
                            onChange={(e) => handleChange('phoneNumber', e)}
                            defaultCountry="CA"
                            readOnly={false}
                        />

                        <DropDownComponent
                            name="gender"
                            selectedValue={gender}
                            onchange={(e) => setGender(e.target.value)}
                            list={genderArr}
                            readOnly={false}
                            isShowZero={false}
                            dropdownLabel="Gender" />

                    </Box>
                </DialogContent>

                <DialogActions>
                    <Box sx={{ display: "flex", width: "50%", mr: 2.2, mb: 2, ml: 2.2 }}>
                        <Box sx={{ display: "flex", gap: 0.5, flexGrow: 1 }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <TextButtonComponet text="Update" classStyle="btn btn-primary"
                                    onButtonClick={handleSubmit}
                                />
                            </Box>
                            <Box sx={{ flexGrow: 1 }}>
                                <TextButtonComponet text="Cancel" classStyle="btn btn-secondary" onButtonClick={onclickcancel} />
                            </Box>
                        </Box>

                    </Box>
                </DialogActions>
            </form>

        </Box>
    );
}

export default UpdateUserForm;
