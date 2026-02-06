

import Repository from "./Repository";
import _ from "lodash";

const getPath = (path)=>{
    return `common/${path}`;
}
const getStudentPath = (path)=>{
    return `student/${path}`;
}
//API CALL for Admin Dashboard flow
class UserDashboardRepository extends Repository {
    userDashboard = async (params) => {
        try {
            const data = await this.postData(getPath('forum/details'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };

    courseProgress = async (params) => {
        try {
            const data = await this.getData(getStudentPath('dashboard/courseProgress'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };

    liveWebinar = async (params) => {
        try {
            const data = await this.getData(getStudentPath('dashboard/webinarList'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };
}

export default new UserDashboardRepository("userDashboard");
