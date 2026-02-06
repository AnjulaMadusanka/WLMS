import Repository from "./Repository";
import _ from "lodash";

const getPath = (path) => {
    return `common/${path}`;
}
//Common API Calls
class CommonRepository extends Repository {
    courseList = async (params) => {
        try {
            const data = await this.getData(getPath('courses/fetch'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };


    stdcourseList = async (params) => {
        try {
            const data = await this.getData('student/course/fetchAll', params);
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };

    updateAdminUserDetails = async (params) => {
        try {
            const data = await this.postData(getPath('user/update'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };
    // 
    validatePromoCode = async (params) => {
        try {
            const data = await this.postData('student/discountPrice', params);
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };

    getForums = async (params) => {
        try {
            const data = await this.postData(getPath('forum/details'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };

    createMessage = async (params) => {
        try {
            const data = await this.postData(getPath('message/create'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };
    onGetAnnouncement = async () => {
        try {
            const data = await this.getData('student/announcement/fetch', {});
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }

    getAssessmentForm = async (params) => {
        try {
            const data = await this.postData(getPath('quiz/assessmentForm'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }

    deleteMessage = async (messageId) => {
        try {
            const data = await this.deleteData(getPath(`message/delete/${messageId}`));
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }

    getSystemParams = async (params) => {
        try {
            const data = await this.getData(getPath('systemParameters'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };

    getSystemCurrency = async (params) => {
        try {
            const data = await this.getData(getPath('systemCurrencies'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };

    getCurrencyShowHideData = async () =>{
        try{
            const data = await this.getData(getPath('showHideCurrencies'),{});
            return _.get(data, `data`);
        } catch(error){
            return {error}
        }
    }

    onResetUserDeviceId = async (email) =>{
        try{
            const data = await this.getData(`common/resetDevice/${email}`,{});
            return _.get(data, `data`);
        } catch(error){
            return {error}
        }
    }
    getNotifications = async (param) => {
        try {
            const data = await this.getData(`notifications/list/${param}`);
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }
    
    readNotification= async (param) => {
        try {
            const data = await this.postData(`notifications/mark-as-read/${param}`);
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }
   
    getVersionNumber = async () => {
        try {
            const data = await this.getData(`app_version/get`,{});
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }

    getAdminNotification  = async () => {
        try {
            const data = await this.getData(`notifications/fetch`,{});
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }

    createAdminNotification = async (param) => {
        console.log(param,'parammmmm')
        try {
            const data = await this.postData(`notifications/createOrEdit`,param);
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }



}

export default new CommonRepository("common");
