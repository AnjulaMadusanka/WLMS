import { param } from "jquery";
import Repository from "./Repository";
import _ from "lodash";



//API CALL for Guest flow
class MessageRepository extends Repository {
    getAllChatList = async (param) => {
        try {
            const data = await this.getData(`admin/message/fetch`, param);
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }
    onCreateMessage= async (params) => {
        try {
            const data = await this.uploadForm('common/message/create', params);
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }

    getChatRoomByUserId = async (id)=>{
        try {
            const data = await this.getData(`admin/message/chatView/${id}`,{},'');
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }


}

export default new MessageRepository("chat");