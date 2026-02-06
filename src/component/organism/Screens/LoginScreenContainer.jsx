import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Actions } from "../../../core/modules/Actions";


const LoginScreenContainer = () => {
  const dispatch = useDispatch();
    useEffect(() => {
      dispatch(Actions.common.getActiveFlag())
    }, []);

    return (<Box>
        <Outlet />
    </Box>);
}

export default LoginScreenContainer;