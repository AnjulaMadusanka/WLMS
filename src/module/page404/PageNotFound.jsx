import React, { useEffect, useRef } from "react";
import { IMAGES } from "../../assets/Images";
import TextButtonComponet from "../../component/atom/Buttons/TextButton";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTopLevelNavigator } from "../../core/services/NavigationServicd";
import { Actions } from "../../core/modules/Actions";

const PageNotFound = () => {
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
       onClick()
    }, []);

    const onClick = ()=>{
        dispatch(Actions.auth.verifyToken());
    }

    return (<>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding:"50px", height:"100vh"}}>
            <div style={{display:"flex", alignItems:"center", flexDirection:"column", gap:50}}>
                <img  style={{objectFit:"cover", width:"65%", height:"auto"}} src={IMAGES.image404} alt="Page not found" />
                <div style={{width:"50%"}}>
                    <TextButtonComponet onButtonClick={onClick} text={"Go Back"} />
                </div>

            </div>

        </div>
    </>);
}

export default PageNotFound;