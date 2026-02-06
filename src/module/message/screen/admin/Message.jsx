import React, { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import HeadingComponent from "../../../../component/atom/Headings/Heading";
import TableComponent from "../../../../component/atom/Table/TableComponent";
import TextButtonComponet from "../../../../component/atom/Buttons/TextButton";
import { useNavigate } from "react-router-dom";
import { Actions } from "../../../../core/modules/Actions";
import { connect } from 'react-redux'
import { setTopLevelNavigator } from "../../../../core/services/NavigationServicd";



const AdminMessageMainScreen = ({ getAllMessages, messageRoomList, verifyToken }) => {
    const navigate = useNavigate();
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        setMessageList(messageRoomList)
    }, [messageRoomList])

    useEffect(() => {
        getAllMessages();
        localStorage.removeItem('adminChatUserId')
    }, []);


    const columns = [
        {
            name: "user_id",
            label: "ID",
            options: {
                filter: true,
                sort: false,
            }
        },

        {
            name: "creator",
            label: "Student Name",
            options: {
                filter: true,
                sort: false,
            }
        },

        {
            name: "message_count",
            label: "Message Count",
            options: {
                filter: true,
                sort: false,
            }
        },

        {
            name: "course_name",
            label: "Course Name",
            options: {
                filter: true,
                sort: false,
            }
        },

        {
            name: "view",
            label: "View Chat",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <Box sx={{ width: "fit-content" }}>
                            <TextButtonComponet text={"View Chat"} onButtonClick={() => viewChat(tableMeta)} />
                        </Box>
                    );
                },
            }
        },
    ];


    const viewChat = (tableMeta) => {

        navigate("/admin-chat", {
            state: {
                user_id: tableMeta?.rowData[0],
            }
        })
        localStorage.setItem('adminChatUserId', tableMeta?.rowData[0])
    }

    return (<>
        <Box className="main-screen-container">
            <Box>
                <HeadingComponent text={"Message"} fontweigth={600} size={40} fontfamily={"Montserrat"} />
            </Box>
            <Box className="common-admin-content-wrap">
                <TableComponent columns={columns} data={messageList} />
            </Box>
        </Box>
    </>);
}

export default connect(
    state => ({
        messageRoomList: state.message.get("messageRoomList")
    }),
    {
        getAllMessages: Actions.message.getAllMessages,
        verifyToken: Actions.auth.verifyToken,
    },
)(AdminMessageMainScreen);