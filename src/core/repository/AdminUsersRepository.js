import Repository from "./Repository";
import _ from "lodash";

const getPath = (path) => {
    return `admin/${path}`;
}
//API CALL for Admin Students flow
class AdminUsersRepository extends Repository {
    getAdminUsersList = async (params) => {
        try {
            const data = await this.postData(getPath('users/fetch'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };

    createAdminUser = async (params) => {
        try {
            const data = await this.postData(getPath('users/create'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };

    

    updateAdminUserStatus = async (params) => {
        try {
            const data = await this.putData(getPath('users/activate_deactivate'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };



    deleteAdminUser = async (userid) => {
        try {
            const data = await this.deleteData(getPath(`users/delete/${userid}`));
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };
}

export default new AdminUsersRepository("users");