import Repository from "./Repository";
import _ from "lodash";

const getPath = (path) => {
  return `admin/courses/${path}`;
};

//API CALL for course flow
class AdminCourseRepository extends Repository {
  //call course main details fetch api
  fetchMainDetails = async (params) => {
    try {
      const data = await this.getData(
        `admin/courses/fetch_by_id/${params.id}`,
        {}
      );
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };

  //call course create api
  adminCourseCreate = async (params) => {
    try {
      const data = await this.uploadForm(getPath("create"), params);
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };

  //call course main details update api
  adminCourseUpdate = async (params) => {
    try {
      const data = await this.uploadForm(getPath("update"), params);
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };

  //call course delete api
  adminCourseDelete = async (courseId) => {
    try {
      const data = await this.deleteData(getPath(`delete/${courseId}`));
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };

  //call course status update api
  adminCourseStatusUpdate = async (params) => {
    try {
      const data = await this.putData(getPath("activate_deactivate"), params);
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };

  //call course content create api
  adminCourseContentCreate = async (params) => {
    try {
      const data = await this.postData(getPath("content/create"), params);
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };

  //call all status course list api
  allStateCourseList = async (params) => {
    try {
      const data = await this.getData(getPath("fetchAllStatus"), params);
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };

  //call course content details fetch api
  getCourseContent = async (courseId) => {
    try {
      const data = await this.getData(
        getPath(`content/byWeek/${courseId}`),
        {}
      );
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };

  // call course content update api
  updateCourseContent = async (params) => {
    try {
      const data = await this.putData(getPath("content/update"), params);
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };

  //call course quiz list fetch api
  getCourseQuizList = async (courseId) => {
    try {
      const data = await this.getData(
        `admin/quiz/fetchByCourseId/${courseId}`,
        {}
      );
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };

  adminCourseContentDelete = async (contentId) => {
    try {
      const data = await this.deleteData(
        getPath(`content/delete/${contentId}`)
      );
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };

  //call course section name update api
  updateCourseSectionName = async (params) => {
    try {
      const data = await this.patchData(
        getPath("content/updateSection"),
        params
      );
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };

  getCourseStuendList = async (params)=>{
    try {
      const data = await this.postData(
        'admin/students/fetch',
        params
      );
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  }
  // api/admin/students/fetch
}

export default new AdminCourseRepository("course");
