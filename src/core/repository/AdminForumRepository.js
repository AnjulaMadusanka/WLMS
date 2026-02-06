import Repository from "./Repository";
import _ from "lodash";

const getPath = (path) => {
    return `admin/${path}`;
}
//API CALL for Admin Students flow
class AdminForumRepository extends Repository {

    getAdminForumWithThreads = async (params) => {
        try {
            const data = await this.postData(getPath('forum/threads'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };

    getAdminForumsById = async (forum_id) => {
        try {
            const data = await this.getData(getPath(`forum/fetch/${forum_id}`));
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };

    getAdminForumsParticipants = async (forum_id) => {
        try {
            const data = await this.getData(getPath(`forum/participants/${forum_id}`));
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };

    updateForumName = async (params) => {
        try {
            const data = await this.putData(getPath('forum/update'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };

    updateForumStatus = async (params) => {
        try {
            const data = await this.putData(getPath('forum/changeStatus'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };

    deleteForum = async (forum_id) => {
        try {
            const data = await this.deleteData(`student/forum/delete/${forum_id}`);
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };
    

    deleteForumReply = async (forum_reply_id) => {
        try {
            const data = await this.deleteData(getPath(`forum/deleteReply/${forum_reply_id}`));
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };

    deleteAdminForumParticipent = async (participant_id) => {
        try {
            const data = await this.deleteData(getPath(`forum/deleteParticipants/${participant_id}`));
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };

    createAdminForum = async (params) => {
        try {
            const data = await this.uploadForm('admin/forum/create', params);
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }
    
}

export default new AdminForumRepository("forums");