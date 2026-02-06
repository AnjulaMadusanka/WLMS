import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { InitialCard } from "../../../component/molecule/Cards";
import { IMAGES } from "../../../assets/Images";
import { Navigate, useNavigate } from "react-router";
import { USER_ROLE } from "../../../core/Constant";
import { setTopLevelNavigator } from "../../../core/services/NavigationServicd";
import { useDispatch } from "react-redux";
import { Actions } from "../../../core/modules/Actions";
import _ from "lodash";
import { AppDownloadButton } from "../../../component/atom";

const InitialScreen = () => {
    const navigate = useNavigate();
    const intervalRef = useRef(null);

    const dispatch = useDispatch()


    const onNavigate = (path, obj = {}) => {
        if (path) {
            navigate(path, obj);
        }
    }


    useEffect(() => {
        intervalRef.current = onNavigate;
        setTopLevelNavigator(intervalRef);
        _.delay(() => {
            dispatch(Actions.auth.verifyToken())
        }, 1000)
    }, [navigate]);

    const onNavigateAbout = (path, type) => {
        localStorage.setItem("userType", type);
        onNavigate(path)
    }

    return (<>
        <Box className="initial-screen-container">
            <Box className="initial-inner-container">
                <Box className="initial-content-wrap">
                    <Box>
                        <InitialCard text={"Admin"} img={IMAGES.admin} onclick={() => onNavigateAbout("/login", USER_ROLE.admin)} />
                    </Box>
                    <Box>
                        <p className="initial-heading-text">OR</p>
                    </Box>
                    <Box>
                        <InitialCard text={"Student"} img={IMAGES.student} onclick={() => onNavigateAbout("/welcome", USER_ROLE.student)} />
                    </Box>

                </Box>
            </Box>

            {/* <AppDownloadButton /> */}
        </Box>
    </>);
}

export default InitialScreen;