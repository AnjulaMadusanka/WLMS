import React,{useEffect, useRef} from "react";
import ResetPasswordForm from "../../../component/molecule/Forms/ResetPasswordForm";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setTopLevelNavigator } from "../../../core/services/NavigationServicd";


const ResetPasswordScreen = () => {
    const navigate = useNavigate()
    const intervalRef = useRef(null);
    
   
   
    const onNavigate = (path, obj = {}) => {
        if(path){
            navigate(path, obj);
         }
    }

    useEffect(() => {
        intervalRef.current = onNavigate;
        setTopLevelNavigator(intervalRef);
    }, [navigate]);

    return (

        <Box className="login-main-container">
        <Box className="login-inner-container">
            <Box className="login-card-content">
                <Box className="login-card-left-wrap">
                    <Box>
                        <img src="https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" alt="logo" className="image-size" />
                    </Box>
                </Box>
                <Box className="login-card-right-wrap">
                   <Box className="login-form">
                    <ResetPasswordForm />
                    </Box> 
                </Box>
            </Box>
        </Box>
    </Box>
    );
}

export default ResetPasswordScreen;