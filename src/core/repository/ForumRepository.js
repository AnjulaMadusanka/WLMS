import { param } from "jquery";
import Repository from "./Repository";
import _ from "lodash";



//API CALL for Guest flow
class ForumRepository extends Repository {
    getAllForumList = async (param) => {
        try {
            const data = await this.postData(`common/forum/details`, param);
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }
    onCreateForum = async (params) => {
        console.log(params,'parammmmmmssssss')
        try {
            const data = await this.uploadForm('student/forum/create', params);
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }

    getForumById = async (id) => {
        try {
            const data = await this.getData(`common/forum/threads/${id}`, {}, '');
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }

    onSendThreadMessage = async (params) => {
        try {
            const data = await this.uploadForm(`student/forum/addReply`, params);
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }

    onJoinForum = async (param) => {
        try {
            const data = await this.postData(`student/forum/register`, param);
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }

    deleteForumReply = async (replyId) => {
        try {
            const data = await this.deleteData(`student/forum/deleteReply/${replyId}`);
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }

}

export default new ForumRepository("forum");
