import React, { useEffect } from "react";
import { IMAGES } from "../../../../assets/Images";
import { useLocation, useNavigate } from "react-router";


const AdminWebinarSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        let value = location.pathname.split('/');
        navigate("/admin-webinar", {state: {isSuccess:value[2]}});
    },[])
return(<>
</>);
}

export default AdminWebinarSuccess;