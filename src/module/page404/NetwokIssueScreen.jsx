import React, { useEffect, useRef } from "react";
import { IMAGES } from "../../assets/Images";
import { useNavigate } from "react-router-dom";


const NetwokIssueScreen = () => {
    const intervalRef = useRef(null);
    const navigate = useNavigate();
 

    return (<>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding:"50px", height:"100vh"}}>
            <div style={{display:"flex", alignItems:"center", flexDirection:"column", gap:50}}>
                <img  style={{objectFit:"cover", width:"65%", height:"auto"}} src={IMAGES.image404} alt="Network issue" />
                

            </div>

        </div>
    </>);
}

export default NetwokIssueScreen;
// 