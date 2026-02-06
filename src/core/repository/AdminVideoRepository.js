

import Repository from "./Repository";
import _ from "lodash";

const getPath = (path) => {
    return `admin/video/${path}`;
}

//API CALL for video flow
class AdminVideoRepository extends Repository {
    //call video fetch api
    fetchVideo = async (params) => {
        try {
            const data = await this.getData(getPath('fetchAll'), params);
            return _.get(data, `data`);
        } catch (error) {

            return { error };
        }
    };

    //call api for upload video 
    adminVideoUpload = async (params) => {
        try {
            const data = await this.uploadForm(getPath('upload'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    };


    deleteAdminVideo = async (params) => {
        try {
            const data = await this.deleteData(getPath(`delete/${params}`));
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    };

    updateAdminVideoTitle = async (params) => {
        try {
            const data = await this.putData(getPath('update'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };



}

export default new AdminVideoRepository("video");
