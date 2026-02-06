

import Repository from "./Repository";
import _ from "lodash";

const getPath = (path)=>{
    return `admin/${path}`;
}
//API CALL for Admin Dashboard flow
class AdminMessageRepository extends Repository {
    getAllMessages = async () => {
        try {
            const data = await this.getData(getPath('message/fetch'));
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };


    getSingleChat = async (chat_user_id) => {
        try {
            const data = await this.getData(getPath(`message/chatView/${chat_user_id}`));
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };
}

export default new AdminMessageRepository("AdminMessage");
