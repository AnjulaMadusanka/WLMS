import Repository from "./Repository";
import _ from "lodash";

const getPath = (path)=>{
    return `admin/${path}`;
}
//API CALL for Admin Students flow
class AdminReviewRepository extends Repository {
    addStudentReviewByAdmin = async (params) => {
        try {
            const data = await this.postData(getPath('review/addReviewAdmin'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };

    getReviewListAdmin = async (courseID) => {
        try{
            const data = await this.getData(getPath(`review/fetch/${courseID}`)); 
            return _.get(data, `data`);
        }catch(error){
            return {error};
        }
    }

    getNonApprovedReviewListAdmin = async () => {
        try{
            const data = await this.getData(getPath('review/unapprovedList')); 
            return _.get(data, `data`);
        }catch(error){
            return {error};
        }
    }

    approveReviewAdmin = async (params) => {
        try{
            const data = await this.putData(getPath('review/approve'), params); 
            return _.get(data, `data`);
        }catch(error){
            return {error};
        }
    }

    deleteReviewAdmin = async (id) => {
        try{
            const data = await this.deleteData(getPath(`review/delete/${id}`)); 
            return _.get(data, `data`);
        }catch(error){
            return {error};
        }
    }
}

export default new AdminReviewRepository("review");