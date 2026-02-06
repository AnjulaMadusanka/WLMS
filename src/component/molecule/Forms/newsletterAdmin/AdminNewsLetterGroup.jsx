import React, { useEffect, useState } from "react";
import { Box, DialogActions, DialogContent } from "@mui/material";
import TableComponent from "../../../atom/Table/TableComponent";
import TextButtonComponet from "../../../atom/Buttons/TextButton";
import _ from "lodash";
import DropDownComponent from "../../../atom/Inputs/DropDown";
import { getText } from "../../../../core/Constant";
import { useDispatch } from "react-redux";
import { Actions } from "../../../../core/modules/Actions";

const AdminNewsletterGroup = ({ onClose, columns, courseList, onGroupListChange, newcourseList, checked }) => {
    const [datalist, setDataList] = useState([]);
    const [courseId, setCourseId] = useState(0);
    const dipatch = useDispatch();
    useEffect(() => {
        setDataList(courseList);
    }, [courseList]);

    const handleSubmit = async (event) => {
        onClose();

    };

    useEffect(() => {
        dipatch(Actions.students.getAdminUserDetails({
            course: "",
            type: 2,
        }));
    }, []);




    const onRowsSelect = (currentRowsSelected, allRowsSelected) => {
        const list = _.map(allRowsSelected, (item) => {
            const user = _.find(courseList, (data, id) => {
                return id == item?.dataIndex;
            });
            return { id: user?.id, name: user?.name };
        });
        onGroupListChange(list);
    };

    return (
        <>
            <form>
                <DialogContent>
                    <Box className="main-screen-container">

                        <Box className="common-admin-content-wrap">
                            <TableComponent
                                rowsPerPage={8}
                                onRowsSelect={onRowsSelect}
                                selectableRowsHideCheckboxes={false}
                                columns={columns}
                                data={courseList}
                                filter={false}
                            />
                        </Box>
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Box sx={{ display: "flex", width: "50%", mr: 2.2, mb: 2, ml: 2.2 }}>
                        <Box sx={{ display: "flex", gap: 0.5, flexGrow: 1 }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <TextButtonComponet text={"ADD"} classStyle="btn btn-primary" onButtonClick={handleSubmit} />
                            </Box>
                            <Box sx={{ flexGrow: 1 }}>
                                <TextButtonComponet text={"Cancel"} classStyle="btn btn-secondary" onButtonClick={() => onClose()} />
                            </Box>
                        </Box>
                    </Box>
                </DialogActions>
            </form>
        </>
    );
};

export default AdminNewsletterGroup;
