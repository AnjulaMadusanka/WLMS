import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Modal } from "@mui/material";
import { connect } from "react-redux";
import { Actions } from "../../../../core/modules/Actions";
import { useNavigate } from "react-router-dom";
import HeadingComponent from "../../../../component/atom/Headings/Heading";
import { NotificationCard, NotificationAlert } from "../../../../component/molecule";
import _ from 'lodash';

const StudentAlertScreen = ({ notifications, getNotifications, currentUser, readNotification, getNotifyId }) => {
    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const [data, setData] = useState(null);
    const [open, setOpen] = useState(false);
    const [notifyId, setNotifyId] = useState(null);
    const [showHtmlModal, setShowHtmlModal] = useState(false);
    const [htmlContent, setHtmlContent] = useState("");

    useEffect(() => {
        getNotifications(currentUser?.id);
    }, [currentUser]);

    useEffect(() => {
        setList(notifications);
    }, [notifications]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            _.forEach(_.filter(notifications, { 'is_read': 0 }), notification => {
                readNotification(notification.id);
            });
            setList(notifications.map(notification => ({
                ...notification,
                is_read: 1
            })));
        }, 3000);

        return () => clearTimeout(timeoutId);

    }, [notifications, readNotification]);

    const handleCardClick = (item) => {
        setOpen(true);
        setData(item);
        setNotifyId(item?.id);
    };

    const handleIconClick = (item) => {
        setHtmlContent(item.message);
        setShowHtmlModal(true);
    };

    const handleClose = () => {
        if (data?.is_read === 0) {
            readNotification(notifyId);
            setList(list.map(notification =>
                notification.id === notifyId ? { ...notification, is_read: 1 } : notification
            ));
        }
        setOpen(false);
    };


    const handlemodalClose = () => {
        setShowHtmlModal(false)
    }

    return (
        <Box className="main-screen-container">
            <Box mb={4} mt={3}>
                <HeadingComponent text={"Notification"} fontWeight={600} size={26} fontFamily={"Montserrat"} />
                <HeadingComponent text={"Find new updates and Notifications"} color={'#4a6375'} fontWeight={300} size={15} fontFamily={"Montserrat"} />
            </Box>
            {list.length > 0 ? (
                list.map((item, index) => (
                    <Grid container key={`std-announcement_${index}`}>
                        <NotificationCard
                            handleCardClick={() => handleCardClick(item)}
                            handleIconClick={() => handleIconClick(item)}
                            item={item}
                        />
                    </Grid>
                ))
            ) : (
                <p>No Notifications found</p>
            )}
            <NotificationAlert
                isRead={open}
                data={data}
                handleClose={handleClose}
            />

            <Modal
                open={showHtmlModal}
                onClose={handlemodalClose}
                aria-labelledby="html-modal-title"
                aria-describedby="html-modal-description"
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh",
                    }}
                >
                    <Box
                        sx={{
                            padding: 4,
                            backgroundColor: "white",
                            borderRadius: 2,
                            width: "50%",
                            maxHeight: "80vh",
                            overflowY: "auto",
                            alignItems: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <h2 style={{ textAlign: 'center' }} id="html-modal-title">Notification Content</h2>
                        <div id="html-modal-description" dangerouslySetInnerHTML={{ __html: htmlContent }} />
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                            <Button onClick={handlemodalClose} variant="contained" autoFocus>
                                Close
                            </Button>
                        </div>
                    </Box>

                </Box>
            </Modal>



        </Box>
    );
};

export default connect(
    state => ({
        notifications: state.notification.get('notifications'),
        currentUser: state.profile.get("currentUser")
    }),
    {
        getNotifications: Actions.notification.getNotifications,
        readNotification: Actions.notification.readNotification,
        getNotifyId: Actions.notification.getNotifyId
    }
)(StudentAlertScreen);
