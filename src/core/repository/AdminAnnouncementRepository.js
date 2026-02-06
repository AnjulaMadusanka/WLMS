

import Repository from "./Repository";
import _ from "lodash";

const getPath = (path)=>{
    return `admin/announcement/${path}`;
}

//API CALL for video flow
class AdminAnnouncementRepository extends Repository {

    //call api for post announcement
    adminPostAnnouncement = async (params) => {
        try {
            const data = await this.uploadForm(getPath('create'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    };

    adminGetAnnouncementList = async (params) => {
        try {
            const data = await this.getData(getPath('fetchAll'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    };

    adminDeleteAnnouncement = async (params) => {
        try {
            const data = await this.deleteData(getPath(`delete/${params}`));
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    };

    adminGetAnnouncement = async (params) => {
        try {
            const data = await this.getData(getPath(`fetch_by_id/${params}`));
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    };

    adminUpdateAnnouncement = async (params) => {
        try {
            const data = await this.postData(getPath("update"), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    };
}

export default new AdminAnnouncementRepository("announcement");
