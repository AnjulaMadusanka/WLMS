import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import TextInputComponent from "../../atom/Inputs/TextInput";
import TextButtonComponet from "../../atom/Buttons/TextButton";
import { useNavigate } from "react-router-dom";
import {
  MINIMUM_PASSWORD_CHARACTERS,
  USER_ROLE,
  EMAIL_REGEX,
  getText,
  getDeviceId,
} from "../../../core/Constant";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "../../../core/modules/Actions";
import { PasswordInputComponent } from "../../atom";

const SignInForm = ({ setForgotPassword }) => {
  //   const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [visibilty, setVisibility] = useState(false);
  const [passwordType, setPasswordType] = useState('password');

  const onEmailChange = (e) => {
    const text = getText(e);
    let isValid = false;
    const reg = EMAIL_REGEX;
    if (text.trim().length > 3) {
      isValid = reg.test(text.trim());
    }
    setEmail(text);
    setIsEmailValid(isValid);
    setEmailError(false);
  };

  const onPasswordChange = (e) => {
    const text = getText(e);
    let isValid = false;
    isValid = text.trim().length > MINIMUM_PASSWORD_CHARACTERS;
    setPassword(text);
    setIsPasswordValid(isValid);
    setPasswordError(false);
  };

  const [userType, setUserType] = useState(1);

  useEffect(() => {
    getUserType();
  }, []);

  const getUserType = async () => {
    const type = localStorage.getItem("userType");
    setUserType(type);
  };

  const onLogin = async () => {
    const device_id = await getDeviceId();
    if (isEmailValid && isPasswordValid) {
      dispatch(Actions.auth.logIn({ email, password: password, device_id }));
    } else {
      if (!isEmailValid) {
        setEmailError(true);
      }
      if (!isPasswordValid) {
        setPasswordError(true);
      }
    }
  };
  const onVisibilityBtn = () => {
    if (visibilty !== true) {
      setVisibility(true);
      setPasswordType('text');
    } else {
      setVisibility(false);
      setPasswordType('password');
    }
  };

  return (
    <Box className="login-form-wrap">
      <Box className="login-form-text-wrap">
        <Box className="login-heading-wrap">
          <h2
            style={{
              color: "black",
              fontSize: 37,
              fontWeight: 700,
              letterSpacing: "0em",
              textAlign: "center",
            }}
          >
            Welcome Back
          </h2>
          <p
            style={{
              color: "#4E657C",
              fontWeight: 500,
              fontSize: 20,
              textAlign: "center",
            }}
          >
            Welcome back, please login to account.
          </p>
        </Box>
      </Box>
      <form>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextInputComponent
            isError={emailError}
            error="Please add valid email"
            value={email}
            onchange={onEmailChange}
            type="text"
            label={"Email"}
            placeholder={"Enter your email address"}
          />

          <PasswordInputComponent
            isError={passwordError}
            error="Please add valid password"
            value={password}
            onchange={onPasswordChange}
            type={passwordType}
            label={"Password"}
            placeholder={"Enter your password"}
            visibility={visibilty}
            onClickVisibility={() => {
              onVisibilityBtn();
            }}
          />
          {/* <TextInputComponent
                        isError={passwordError}
                        error="Please add valid password"
                        value={password} onchange={onPasswordChange} type="password" label={"Password"} placeholder={"Enter your password"} /> */}
        </Box>

        <Box className="login-forgot-password">
          <p
            style={{
              color: "#778FA7",
              fontSize: 15,
              fontWeight: 500,
              cursor: "pointer",
              paddingTop: 16,
            }}
            onClick={() => {
              setForgotPassword(true);
            }}
          >
            Forgot Password?
          </p>
        </Box>

        <Box className="login-sign-in-btn">
          <TextButtonComponet
            onButtonClick={() => {
              onLogin();
            }}
            width="100%"
            text="Sign in "
          />
        </Box>

        {/* {USER_ROLE.student == userType ? <Box className="login-create-account-text">
                    <p style={{ fontSize: 20, fontWeight: 500, color: "#4E657C" }}>Don't have an account? <span style={{ fontWeight: 500, color: "#28B882", fontSize: 20, fontWeight: 500, }}>Create</span></p>
                </Box> : null} */}
      </form>
    </Box>
  );
};

export default SignInForm;
