

import Repository from "./Repository";
import _ from "lodash";

const getPath = (path)=>{
    return `common/${path}`;
}
const getStudentPath = (path)=>{
    return `student/${path}`;
}
//API CALL for Admin Dashboard flow
class CourseRepository extends Repository {
    getCousreCatalog = async (params) => {
        try {
            const data = await this.getData(getStudentPath('course/fetchCatalog'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };
    getCousreDetails = async (params) => {
        try {
            const data = await this.getData(getStudentPath(`course/detailForLoggedUser/${params}`));
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };

    setVideoCompleted = async (params) =>{
        try {
            const data = await this.patchData(getStudentPath('video/markAsCompleted'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    }

    onVideosMarkAsInCompleted= async (list) =>{
        try {
            const data = await this.patchData(getStudentPath('video/markAsIncompleted'),{course_content_ids: list});
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    }

    

    addReviewByStudent = async (params) =>{
        try {
            const data = await this.postData(getStudentPath('course/addReview'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    }

    addReviewStatus = async (params) =>{
        try {
            const data = await this.postData(getStudentPath('course/checkReview'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    }
    onEnrollNewCourse = async (params) =>{
        try {
            const data = await this.postData(getStudentPath('course/enrollAndPayment'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    }
    getSignedUrl = async (params) => {
        console.log(params,'course content id')
        try {
            const data = await this.getData(getStudentPath(`course/getSignedUrl/${params}`));
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };

    getCourseCurrencies = async (courseId) => {
        try {
            const data = await this.getData(getPath(`CourseCurrencies/${courseId}`));
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }
}

export default new CourseRepository("course");


