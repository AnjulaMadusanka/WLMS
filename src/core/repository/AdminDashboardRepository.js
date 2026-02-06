

import Repository from "./Repository";
import _ from "lodash";

const getPath = (path)=>{
    return `admin/${path}`;
}
//API CALL for Admin Dashboard flow
class AdminDashboardRepository extends Repository {
    adminDashboard = async (params) => {
        try {
            const data = await this.getData(getPath('students/latest_registrations'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };
}

export default new AdminDashboardRepository("adminDashboard");
