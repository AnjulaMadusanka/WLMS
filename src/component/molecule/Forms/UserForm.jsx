import React, { useState } from "react";
import { Box,DialogContent } from "@mui/material";
import TextInputComponent from "../../atom/Inputs/TextInput";
import DropDownComponent from "../../atom/Inputs/DropDown";



const UserForm = ({ onClose, type }) => {
    return (
        <Box p={1}>
            <form>
                <DialogContent>
                    <Box>
                        <TextInputComponent
                            label={"First Name"}
                            placeholder="First Name"
                            readOnly={type === "view" ? true : false}
                        />


                        <TextInputComponent
                            label={"Last Name"}
                            placeholder="Last Name"
                            readOnly={type === "view" ? true : false}
                        />



                        <TextInputComponent
                            label={"Email"}
                            placeholder="Email"
                            readOnly={type === "view" ? true : false}
                        />


                        <TextInputComponent
                            label={"Phone Number"}
                            placeholder="Phone Number"
                            readOnly={type === "view" ? true : false}
                        />

                        {type === "view" ? <TextInputComponent
                            label={"gender"}
                            placeholder="Gender"
                            readOnly={type === "view" ? true : false}
                        />
                            : <DropDownComponent readOnly={type === "view" ? true : false} dropdownLabel="Gender" />
                        }

                    </Box>
                </DialogContent>
            </form>

        </Box>
    );
}

export default UserForm;
