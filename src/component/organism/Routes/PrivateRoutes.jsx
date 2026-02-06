import React, { useRef, useEffect } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { setTopLevelNavigator } from "../../../core/services/NavigationServicd";
import { useDispatch } from 'react-redux'
import { Actions } from "../../../core/modules/Actions";

const PrivateRoutes = () => {
    const intervalRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onNavigate = (path, obj = {}) => {
        if (path) {
            navigate(path, obj);
        }
    }

    useEffect(() => {
        intervalRef.current = onNavigate;
        setTopLevelNavigator(intervalRef);
    }, [navigate]);

    useEffect(() => {
        dispatch(Actions.auth.verifyToken());
    }, []);


    let auth = localStorage.getItem('token');
    return (<>
        {auth ? <Outlet /> : <Navigate to="/login" />}
    </>);
}

export default PrivateRoutes;