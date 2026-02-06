import Repository from "./Repository";
import _ from "lodash";

const getPath = (path)=>{
    return `admin/${path}`;
}
//API CALL for Admin Students flow
class AdminStudentRepository extends Repository {
    getAdminUsersList = async (params) => {
        try {
            const data = await this.postData(getPath('users/fetch'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };

    createAdminStudent = async (params) => {
        try{
            const data = await this.postData(getPath('students/create'), params); 
            return _.get(data, `data`);
        }catch(error){
            return {error};
        }
    }

    updateStudentStatus = async (params) => {
        try{
            const data = await this.putData(getPath('users/activate_deactivate'), params); 
            return _.get(data, `data`);
        }catch(error){
            return {error};
        }
    }

    updateCourseStudentStatus = async (params) => {
        try{
            const data = await this.putData(getPath('students/course-disable'), params); 
            return _.get(data, `data`);
        }catch(error){
            return {error};
        }
    }

    getAdminUsersNotRegisteredInCourse = async (courseId) => {
        try {
            const data = await this.getData(getPath(`students/notRegisteredForCourse/${courseId}`), {});
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };

     //call students adding for courses
     addExistingStudentsToACourse = async (params) => {
    try {
      const data = await this.postData(getPath("students/addToCourse"), params);
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };

  getStudentProgress= async (params) => {
    try {
      const data = await this.postData(getPath("courses/studentCourseProgress"), params);
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };

  getStudentAttemptDetails= async (params) => {
    try {
      const data = await this.postData(getPath("quiz/studentAttemptsDetails"), params);
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };

  getAdminCourseDetails= async (params) => {
    try {
      const data = await this.getData(getPath(`students/detailFetchForStudent/${params.stdId}/${params.courseId}`),{});
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };
}

export default new AdminStudentRepository("student");