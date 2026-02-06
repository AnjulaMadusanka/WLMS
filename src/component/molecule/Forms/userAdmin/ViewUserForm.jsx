import { DialogContent } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { TextInputComponent } from "../../../atom";


const ViewUserForm = ({ data }) => {
    return (<Box p={1}>
        <DialogContent>
            <Box>
                <TextInputComponent
                    label={"First Name"}
                    name="firstName"
                    value={data?.first_name}
                    placeholder="First Name"
                    readOnly
                />

                <TextInputComponent
                    label={"Last Name"}
                    name="lastName"
                    value={data?.last_name}
                    placeholder="Last Name"
                    readOnly
                />

                <TextInputComponent
                    label={"Email"}
                    name="email"
                    value={data?.email}
                    placeholder="Email"
                    readOnly
                />

                <TextInputComponent
                    label={"Phone Number"}
                    name="phoneNumber"
                    value={data?.phone_number}
                    placeholder="Phone Number"
                    readOnly
                />


                <TextInputComponent
                    label={"Gender"}
                    name="gender"
                    value={data?.gender == 1 ? "Male" : "Female"}
                    placeholder="Gender"
                    readOnly
                />
            </Box>
        </DialogContent>
    </Box>);
}

export default ViewUserForm;