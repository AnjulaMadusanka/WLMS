import Repository from "./Repository";
import _ from "lodash";

const getPath = (path) => {
    return `admin/${path}`;
}
//API CALL for Admin Students flow
class AdminWebinarRepository extends Repository {
    createWebinar = async (params) => {
        try {
            const data = await this.postData(getPath('webinar/create'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };

    getAdminWebinarList = async (params) => {
        try {
            const data = await this.getData(getPath('webinar/fetch'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };
    
    getAdminWebinarById = async (webnarId) => {
        try {
            const data = await this.getData(getPath(`webinar/fetch_by_id/${webnarId}`));
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };


    updateAdminWebinarStatus = async (params) => {
        try {
            const data = await this.putData(getPath('webinar/activate_deactivate'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };

    updateAdminWebinar = async (params) => {
        try {
            const data = await this.putData(getPath('webinar/update'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };

   deleteAdminWebinar = async (webnarId) => {
        try {
            const data = await this.deleteData(getPath(`webinar/delete/${webnarId}`));
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };

    updateAdminWebinarComplete = async (params) => {
        try {
            const data = await this.putData(getPath('webinar/complete'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };


    addCourseToWebinar = async (params) => {
        try {
            const data = await this.postData(getPath('webinar/addCourses'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };


   
}

export default new AdminWebinarRepository("webinar");