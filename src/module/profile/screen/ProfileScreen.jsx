import React, { useState, useEffect, useRef } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import { AccessAlarm, ThreeDRotation, Delete } from '@mui/icons-material';
import {Actions} from "../../../core/modules/Actions";
import { TextInputComponent, TopTab } from "../../../component/atom";
import { connect } from "react-redux";
import { Profile, Changepassword } from "../../../component/organism";
import { useLocation , useNavigate} from "react-router-dom";
import { setTopLevelNavigator } from "../../../core/services/NavigationServicd";
import HeadingComponent from "../../../component/atom/Headings/Heading";
const list = [
    {
        value: 0,
        label: 'My profile'
    },
    {
        value: 1,
        label: 'Password Settings'
    }
]

const ProfileScreen = ({ currentUser,  getUserData , verifyToken}) => {

    const [value, setValue] = React.useState(0);
    const [user, setUser] = useState({})

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        getUserData();
        // verifyToken()
    }, []);

    const navigate = useNavigate()
    // const intervalRef = useRef(null);

    // const onNavigate = (path, obj = {}) => {
    //     if(path){
    //         navigate(path, obj);
    //      }
    // }

    // useEffect(() => {
    //     intervalRef.current = onNavigate;
    //     setTopLevelNavigator(intervalRef);
    // }, [navigate]);

    return (
        <Box className="main-screen-container">
       <Grid mt={'30px'} container >
       <HeadingComponent text={"Profile"} fontweigth={600} size={26} fontfamily={"Montserrat"} />
       </Grid>
            <Grid container >
                {/* <Grid item xs={12}>
                    <p className={"ProfileText"}>Profile</p>
                </Grid> */}
                <Grid mt={'15px'} item xs={12}>
                    <div className={"tabSpace"}>
                        <TopTab tabList={list} onButtonPress={handleChange} value={value} />
                    </div>
                </Grid>
           
            {value == 0 ? <Profile /> :
                <Changepassword />}
                 </Grid>
        </Box>
    )
};

export default connect(
    state => ({
        currentUser: state.profile.get('currentUser')
    }),
    {
        getUserData: Actions.profile.getUserData,
        verifyToken: Actions.auth.verifyToken
    }
)(ProfileScreen);