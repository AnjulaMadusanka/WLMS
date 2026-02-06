

import { param } from "jquery";
import Repository from "./Repository";
import _ from "lodash";

const getPath = (path) => {
    return `student/${path}`;
}

//API CALL for Guest flow
class GuestRepository extends Repository {
    getInitialCourseDetails = async (params) => {
        try {
            const data = await this.getData(`student/course/detailFetch`, params);
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }
    getSampleClass = async (quizId) => {
        try {
            const data = await this.getData(`common/video/fetchSampleClass/${quizId}`, {});
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }
    freeOreinataion = async (params) => {
        try {
            const data = await this.postData(getPath('orientation/create'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    }
}

export default new GuestRepository("guest");
