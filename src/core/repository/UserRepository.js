import { param } from "jquery";
import Repository from "./Repository";
import _ from "lodash";



//API CALL for Guest flow
class UserRepository extends Repository {
    getUserDetail = async () => {
        try {
            const useId = localStorage.getItem("userId")
            const data = await this.getData(`common/user/fetch_by_id/${useId}`, {});
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }
    changePassword = async (params) => {
        try {
            const data = await this.postData('common/change-password', params);
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }

    updateUser = async (param)=>{
        try {
            const data = await this.uploadForm('common/user/update',param,'');
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }

}

export default new UserRepository("user");
