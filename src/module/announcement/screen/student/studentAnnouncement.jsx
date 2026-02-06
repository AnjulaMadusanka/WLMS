import React, { useEffect, useState, useRef } from "react";
import { AnnouncementCard } from "../../../../component/molecule";
import HeadingComponent from "../../../../component/atom/Headings/Heading";
import { Box, Grid } from "@mui/material";
import { connect } from "react-redux";
import { Actions } from "../../../../core/modules/Actions";
import { useNavigate } from "react-router-dom";
import { setTopLevelNavigator } from "../../../../core/services/NavigationServicd";

const StudentAnnouncementScreen = ({ stdAnnouncementList, getAnnouncementForStudent, verifyToken }) => {
    const navigate = useNavigate()
    const [list, setList] = useState([]);

    useEffect(() => {
        getAnnouncementForStudent();
    }, []);

    useEffect(() => {
        setList(stdAnnouncementList);
    }, [stdAnnouncementList]);

    return (<>
        <Box className="main-screen-container">
            <Box mb={4} mt={3}>
                <HeadingComponent text={"Resources"} fontweigth={600} size={26} fontfamily={"Montserrat"} />
                <HeadingComponent text={"Find new updates and Resources"} color={'#4a6375'} fontweigth={300} size={15} fontfamily={"Montserrat"} />
            </Box>
            {list.length > 0 ?
                list.map((item, index) => {
                    return (<>
                        <Grid
                            sx={{
                                p: 2,
                                margin: 'auto',
                                backgroundColor: '#f2f6f8',
                                borderRadius: '20px',
                                mb: 2
                            }}
                        >
                            <Grid container key={`std-announcement_${index}`} >
                                <AnnouncementCard item={item} />
                            </Grid>
                        </Grid>
                    </>)
                })
                : (<>
                    <p>No announcements found</p>
                </>)}



        </Box>

    </>)
}

export default connect(
    state => ({
        stdAnnouncementList: state.announcement.get('stdAnnouncementList'),
    }),
    {
        getAnnouncementForStudent: Actions.announcement.getAnnouncementForStudent,
        verifyToken: Actions.auth.verifyToken
    })(StudentAnnouncementScreen);