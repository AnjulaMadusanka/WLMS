import React, { useRef, useEffect, useState } from "react";
import {
    Box,
    Rating,
    Typography,
    Grid,
    Item,
    Divider,
    Button,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import HeadingComponent from "../../../component/atom/Headings/Heading";
import {
    DashboardStudentCard,
    ForumCard,
    LiveClassCard,
} from "../../../component/molecule";
import { Actions } from "../../../core/modules/Actions";
import { connect } from "react-redux";
import Iframe from 'react-iframe'
import _ from "lodash";




const DashboardScreen = ({

}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [link, setLink] = useState('');

    useEffect(() => {
        const url = location?.state?.url
        setLink(url);
    }, [location])
    // const intervalRef = useRef(null);



    return (
        <div className="main-screen-container">
            <Grid item>
                <HeadingComponent
                    text={`App Delete Account`}
                    fontweigth={600}
                    size={40}
                    fontfamily={"Montserrat"}
                    backNavigation={true}
                />
            </Grid>

            <Grid container>
                <Grid item>
                    <Iframe url={`https://winspert.archnix.com/deletion-request-form/`}
                    allowFullScreen={true}
                        width="640px"
                        height="420px"
                        id=""
                        className=""
                        display="block"
                        position="relative" />
                </Grid>

            </Grid>
        </div>
    );
};

export default connect(
    (state) => ({
        userDashboardData: state.home.get("userDashboardData"),
        courseprogress: state.home.get("courseprogress"),
        liveWebinar: state.home.get("liveWebinar"),
    }),
    {
        userDashboard: Actions.home.userDashboard,
        getcourseProgress: Actions.home.getcourseProgress,
        verifyToken: Actions.auth.verifyToken,
        getLiveWebinar: Actions.home.getLiveWebinar,
    }
)(DashboardScreen);
