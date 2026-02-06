import React, { useEffect, useState , useRef} from "react";
import { Box } from "@mui/material";
import SignInForm from "../../../component/molecule/Forms/SignInForm";
import ForgotPasswordForm from "../../../component/molecule/Forms/ForgotPasswordForm";
import { IMAGES } from "../../../assets/Images";
import VerifyEmailForm from "../../../component/molecule/Forms/VerifyEmailForm";
import ResetPasswordForm from "../../../component/molecule/Forms/ResetPasswordForm";
import { connect } from "react-redux";
import { Actions } from "../../../core/modules/Actions";
import { REST_PASSWORD_STATE } from "../../../core/Constant";
import { Navigate, useNavigate } from "react-router";
import { setTopLevelNavigator } from "../../../core/services/NavigationServicd";

const LoginScreen = ({ resetPasswordState, goBackResetPassword }) => {
    const [forgotPassword, setForgotPassword] = useState(false);
    const [forgotPasswordState, setForgotPasswordState] = useState(REST_PASSWORD_STATE.ENTER_EMAIL)
    const intervalRef = useRef(null);
    const navigate = useNavigate();

    const onNavigate = (path,obj={}) => {
        if(path){
            navigate(path, obj);
         }
    }

    const onBack = () => {
        setForgotPassword(false)
        onNext(REST_PASSWORD_STATE.ENTER_EMAIL)
        goBackResetPassword();
    }

    const onNext = (data) => {
        setForgotPasswordState(data);
    }

    useEffect(() => {
        setForgotPasswordState(resetPasswordState);
    }, [resetPasswordState]);

    useEffect(()=>{
        intervalRef.current = onNavigate;
        setTopLevelNavigator(intervalRef);
      },[navigate])

    return (< >
        <Box className="login-main-container">
            <Box className="login-inner-container">
                <Box className="login-logo-section">
                    <img src={IMAGES.logo} alt="logo" className="login-logo" />
                </Box>
                <Box className="login-form-section">
                    <Box className="login-form-section-wrap">
                        {forgotPassword ? <Box className="login-form">
                            {forgotPasswordState == REST_PASSWORD_STATE.ENTER_EMAIL ?
                                <ForgotPasswordForm onBack={onBack}
                                // onNext={() => onNext(REST_PASSWORD_STATE.OTP_VERIFICATION)}
                                /> :
                                forgotPasswordState == REST_PASSWORD_STATE.OTP_VERIFICATION ?
                                    <VerifyEmailForm onBack={onBack}
                                    // onNext={() => onNext(REST_PASSWORD_STATE.RESET_PASSWORD)} 
                                    /> :
                                    <ResetPasswordForm goBack={onBack} onNext={onBack} />}
                        </Box> :
                            <Box className="login-form">
                                <SignInForm setForgotPassword={setForgotPassword} />
                            </Box>
                        }
                    </Box>
                </Box>
            </Box>
        </Box>

    </>);
}

export default connect(
    state => ({
        resetPasswordState: state.auth.get("resetPasswordState"),
    }),
    {
        logIn: Actions.auth.logIn,
        goBackResetPassword: Actions.auth.goBackResetPassword,
    },
)(LoginScreen);

