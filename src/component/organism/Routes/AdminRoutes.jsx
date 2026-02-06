import { Outlet, Navigate } from "react-router-dom";
import { USER_ROLE } from "../../../core/Constant";

const AdminRoutes = () => {
    let user = parseInt(localStorage.getItem('userType'));
    return (<>
    {user == USER_ROLE.admin ? <Outlet/>: <Navigate to="*"/>}
    </>);
}

export default AdminRoutes;