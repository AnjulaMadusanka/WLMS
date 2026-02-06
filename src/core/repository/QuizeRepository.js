import Repository from "./Repository";
import _ from "lodash";

//API CALL for Guest flow
class GuestRepository extends Repository {
  onGetAllQuizList = async (params) => {
    try {
      const data = await this.getData(`admin/quiz/fetch`, params);
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };

  onCreateQuiz = async (params) => {
    console.log(params, "params");
    try {
      const data = await this.postData("admin/quiz/create", params);
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };

  onGetSingleQuizData = async (quizId) => {
    try {
      const data = await await this.getData(
        `admin/quiz/fetchById/${quizId}`,
        {}
      );
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };

  onGetSingleQuestionAndAnswers = async (quizeId) => {
    console.log(quizeId, "quizeId");
    try {
      const data = await await this.getData(
        `admin/question/fetchQnA/${quizeId}`,
        {}
      );
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };

  onDeleteQuiz = async (quizId) => {
    try {
      const data = await this.deleteData(`admin/quiz/delete/${quizId}`, {});
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };

  onUpdateQuizState = async (params) => {
    try {
      const data = await this.putData(`admin/quiz/activateDeactivate`, params);
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };

  onGetCourseWeeksData = async (courseId) => {
    try {
      const data = await this.getData(
        `admin/quiz/weekDropdown/${courseId}`,
        {}
      );
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };

  onGetQuizSubmissionHistory = async (params) => {
    try {
      const data = await this.fetchdata(`admin/quiz/submissionList?page=${params?.page}&per_page=${params?.per_page}&search=${params?.search}`, {});
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };

  onCreateQuestion = async (params,quizId) => {
    try {
      const data = await this.uploadForm(
        "admin/question/questionsAnswers",
        params
      );
      return { data: _.get(data, `data`), quizId };
    } catch (error) {
      return { error };
    }
  };

  onDeleteQuestion = async (questionId) => {
    try {
      const data = await this.deleteData(
        `admin/question/delete/${questionId}`,
        {}
      );
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };

  addFeedbackAssessment = async (params) => {
    try {
      const data = await this.putData(`admin/quiz/addFeedback`, params);
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };

  assessmentQuestionNReasonAdmin = async (params) => {
    try {
      const data = await this.postData(
        "admin/quiz/questionWiseAssessment",
        params
      );
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };

  onDeleteAttempt = async (params) => {
    try {
      const data = await this.postData(`admin/quiz/deleteAttempt`, params);
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };

  onUpdateQuiz = async (params) => {
    try {
      const data = await this.postData(`admin/quiz/update`, params);
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };

  onUpdateQuestion = async (params) => {
    try {
      const data = await this.postData(`admin/question/update`, params);
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };

  resetAttempts = async (params) => {
    try {
      const data = await this.postData(
        "admin/quiz/resetAttempts",
        params
      );
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };

  onGetAttemptgraph = async (params) => {
    try {
      const data = await this.postData(`admin/quiz/studentAttemptGraph`, params);
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };
  getCategoryList = async () => {
    try {
      const data = await this.getData(`admin/quiz/categories`, {});
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };
  addCategory = async (params) => {
    try {
      const data = await this.postData(`admin/quiz/categories`, params);
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };
  getSubjectList = async () => {
    try {
      const data = await this.getData(`admin/quiz/subjects`, {});
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };
  addSubject = async (params) => {
    console.log(params, "params");
    try {
      const data = await this.postData(`admin/quiz/subjects`, params);
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };
  editCategory = async (params) => {
    try {
      const data = await this.putData(`admin/quiz/categories/${params.id}`, {
        name: params.name,});
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };
  deleteCategory = async (id) => {
    try {
      const data = await this.deleteData(`admin/quiz/categories/${id}`, {});
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };
  editSubject = async (params) => {
    try {
      const data = await this.putData(`admin/quiz/subjects/${params.id}`, {
        name: params.name,parent_subject_id:params.parent_subject_id});
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };
  deleteSubject = async (id) => {
    try {
      const data = await this.deleteData(`admin/quiz/subjects/${id}`, {});
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  }
  addQuestion = async (params,quizId) => {
    try {
      const data = await this.postData(`admin/question/addQuestion`, params);
      return  _.get(data, `data`)
    } catch (error) {
      return { error };
    }
  };
  getQuestions = async (params) => {
    console.log(params,'paramsss')
    try {
      const data = await this.postData(`admin/question/fetchQuestions`, params);
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };
  addQuestiontoQuiz = async (params) => { 
    console.log(params, "Qurstions params");
    try {
      const data = await this.postData(`admin/question/addQuestionsToQuiz`, params);
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };
  removeQuestionfromQuiz = async (params) => {
    console.log(params, "Qurstions params");
    try {
      const data = await this.postData(`admin/question/removeQuestionFromQuiz`, params);
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  }
  fetchGrades = async (params) => {
    console.log(params, "params");
    try {
      const data = await this.postData(`admin/quiz/grades/fetch`, params);
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };
  addGrades = async (params) => {

    try {
      const data = await this.postData(`admin/quiz/grades/add`, params);
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };
  updateGrade = async (params) => {

    try {
      const data = await this.putData(`admin/quiz/grades/edit`, params);
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  }
  editQuestion = async (params) => {
    try {
      const data = await this.postData(`admin/question/updateQuestion`, params);
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };
  deleteQuestion = async (params) => {
    try {
      const data = await this.deleteData(`admin/question/delete`, params);
      return _.get(data, `data`);
    } catch (error) {
      return { error };
    }
  };
}


 
export default new GuestRepository("quiz");
