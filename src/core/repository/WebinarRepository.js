

import Repository from "./Repository";
import _ from "lodash";

const getPath = (path)=>{
    return `common/${path}`;
}
const getStudentPath = (path)=>{
    return `student/${path}`;
}
//API CALL for Admin Dashboard flow
class WebinarRepository extends Repository {
   getWebinar = async (params) => {
        try {
            const data = await this.getData(getStudentPath('video/fetchCourseVideos/'+params));
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };
}

export default new WebinarRepository("webinar");
