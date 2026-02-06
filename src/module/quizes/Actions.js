import { createAction } from '../../core/AppUtils';
import { CommonRepository, GuestRepository, UserRepository } from '../../core/repository';
import QuizRepository from '../../core/repository/QuizRepository';
import { QuizeRepository } from '../../core/repository';
import { remove } from 'lodash';

export const ModuleEvents = {
  STD_GET_QUIZ_LIST: 'STD_GET_QUIZ_LIST',
  STD_START_QUIZ: 'STD_START_QUIZ',
  STD_GET_QUESTIONS: 'STD_GET_QUESTIONS',
  STD_GET_ATTEMPTS: 'STD_GET_ATTEMPTS',
  STD_COMPLETE_QUIZ: 'STD_COMPLETE_QUIZ',
  STD_STUDENT_ANSWERS: 'STD_STUDENT_ANSWERS',
  GET_ALL_QUIZE_LIST: "GET_ALL_QUIZE_LIST",
  CREATE_QUIZE: "CREATE_QUIZE",
  GET_QUIZ_AND_ANSWER_BY_QUIZ_ID: "GET_QUIZ_AND_ANSWER_BY_QUIZ_ID",
  DELETE_QUIZE: "DELETE_QUIZE",
  GET_QUIZ_DATA: 'GET_QUIZ_DATA',
  UPDATE_QUIZ_STATE: "UPDATE_QUIZ_STATE",
  GET_QUIZ_SUBMISSION_HISTORY: "GET_QUIZ_SUBMISSION_HISTORY",
  GET_COURSE_WEEK_DATA_LIST: "GET_COURSE_WEEK_DATA_LIST",
  CREATE_QUESTION: "CREATE_QUESTION",
  DELETE_QUESTION: "DELETE_QUESTION",
  GET_ASSESSMENT_FORM_DETAILS: 'GET_ASSESSMENT_FORM_DETAILS',
  ADD_FEEDBACK_QUIZ_ADMIN: 'ADD_FEEDBACK_QUIZ_ADMIN',
  GET_ASSESSMENT_QUESTION_N_REASON: 'GET_ASSESSMENT_QUESTION_N_REASON',
  CALL_FOR_CHANGEING_START_QUIZ_STATE: 'CALL_FOR_CHANGEING_START_QUIZ_STATE',
  GET_ASSESSMENT_QUESTION_N_REASON_ADMIN: 'GET_ASSESSMENT_QUESTION_N_REASON_ADMIN',
  DELETE_ATTEMPT: 'DELETE_ATTEMPT',
  UPDATE_QUIZ_ADMIN: 'UPDATE_QUIZ_ADMIN',
  UPDATE_QUESTION_ADMIN: 'UPDATE_QUESTION_ADMIN',
  GET_COURSE_LIST_BY_QUIZ: "GET_COURSE_LIST_BY_QUIZ",
  RESET_QUIZ_ATTEMPT_BY_ADMIN: "RESET_QUIZ_ATTEMPT_BY_ADMIN",
  GET_ATTEMPT_GRAPGH: 'GET_ATTEMPT_GRAPGH',
  GET_A_QUESTION_OF_QUIZ_BY_QID: "GET_A_QUESTION_OF_QUIZ_BY_QID",
  CHECK_QUIZ_CURRENT_STATUS_BY_STUDENT: "CHECK_QUIZ_CURRENT_STATUS_BY_STUDENT",
  GET_GRAPH_DATA: "GET_GRAPH_DATA",
  ADD_QUESTION_TO_QUIZ:"ADD_QUESTION_TO_QUIZ",
  ADD_GRADES:"ADD_GRADES",
  FETCH_GRADES:"FETCH_GRADES",
  REMOVE_QUESTION_FROM_QUIZ:'REMOVE_QUESTION_FROM_QUIZ',
  UPDATE_GRADES:"UPDATE_GRADES"
};

export default {
  stdgetQuizlist: createAction(ModuleEvents.STD_GET_QUIZ_LIST, async (params) => {
    return await QuizRepository.stdgetQuizlist(params);
  }),

  stdstartQuiz: createAction(ModuleEvents.STD_START_QUIZ, async (params) => {
    const data = await QuizRepository.stdstartQuiz(params);
    return { ...data, params }
  }, { loading: true, errorMessage: 'Error occured while starting quiz. Please try again.' }),

  stdgetQuestions: createAction(ModuleEvents.STD_GET_QUESTIONS, async (params) => {
    return await QuizRepository.stdgetQuestion(params);
  }),

  stdgetquizAttempts: createAction(ModuleEvents.STD_GET_ATTEMPTS, async (params) => {
    return await QuizRepository.stdgetquizAttempts(params);
  }),

  stdquizComplted: createAction(ModuleEvents.STD_COMPLETE_QUIZ, async (params) => {
    const data = await QuizRepository.stdquizComplted(params);
    return { ...data, quizId: params?.quiz_id }
  }),
  stdStudentAnswer: createAction(ModuleEvents.STD_STUDENT_ANSWERS, async (params, nextData) => {
    const data = await QuizRepository.setStudentAnswer(params);
    return { ...data, nextData }
  }, { loading: true, errorMessage: 'Error occured while loading Requesting' }),
  getQuizeList: createAction(ModuleEvents.GET_ALL_QUIZE_LIST, async () => {
    return await QuizeRepository.onGetAllQuizList()
  }),
  createQuize: createAction(ModuleEvents.CREATE_QUIZE, async (params) => {
    return await QuizeRepository.onCreateQuiz(params)
  }),
  getQuizQuestionAndAnswerByQuizId: createAction(ModuleEvents.GET_QUIZ_AND_ANSWER_BY_QUIZ_ID, async (params) => {
    return await QuizeRepository.onGetSingleQuestionAndAnswers(params)
  }),
  deleteQuize: createAction(ModuleEvents.DELETE_QUIZE, async (params) => {
    return await QuizeRepository.onDeleteQuiz(params)
  }),
  getQuizById: createAction(ModuleEvents.GET_QUIZ_DATA, async (params) => {
    return await QuizeRepository.onGetSingleQuizData(params)
  }),
  upDateQuizState: createAction(ModuleEvents.UPDATE_QUIZ_STATE, async (params) => {
    return await QuizeRepository.onUpdateQuizState(params)
  }),
  getQuizSumbissionHistory: createAction(ModuleEvents.GET_QUIZ_SUBMISSION_HISTORY, async (params) => {
    return await QuizeRepository.onGetQuizSubmissionHistory(params)
  }),

  getCourseWeekDataList: createAction(ModuleEvents.GET_COURSE_WEEK_DATA_LIST, async (params) => {
    return await QuizeRepository.onGetCourseWeeksData(params)
  }),

  createQuestion: createAction(ModuleEvents.CREATE_QUESTION, async (params, quizId) => {
    const data = await QuizeRepository.onCreateQuestion(params);
    return { ...data, quizId }
  }),

  deleteQuestion: createAction(ModuleEvents.DELETE_QUESTION, async (questionId, quizId) => {
    const data = await QuizeRepository.onDeleteQuestion(questionId);
    return { ...data, quizId }
  }),

  getAssessmentFormDetails: createAction(ModuleEvents.GET_ASSESSMENT_FORM_DETAILS, async (params) => {
    const data = await CommonRepository.getAssessmentForm(params);
    return { ...data }
  }),

  addFeedbackForm: createAction(ModuleEvents.ADD_FEEDBACK_QUIZ_ADMIN, async (params) => {
    const data = await QuizeRepository.addFeedbackAssessment(params);
    return { ...data }
  }),

  getAssessmentResonNQuestion: createAction(ModuleEvents.GET_ASSESSMENT_QUESTION_N_REASON, async (params) => {
    const data = await QuizRepository.stdAssessmentQuestionNReason(params);
    return { ...data }
  },{ loading: true, errorMessage: 'Error occured while starting quiz. Please try again.'}),

  quizStateChange: createAction(ModuleEvents.CALL_FOR_CHANGEING_START_QUIZ_STATE, (data) => data),

  getAssessmentResonNQuestionAdmin: createAction(ModuleEvents.GET_ASSESSMENT_QUESTION_N_REASON_ADMIN, async (params) => {
    const data = await QuizeRepository.assessmentQuestionNReasonAdmin(params);
    return { ...data }
  }),

  deleteAttempt: createAction(ModuleEvents.DELETE_ATTEMPT, async (params) => {
    const data = await QuizeRepository.onDeleteAttempt(params);
    return { ...data }
  }),

  updateQuiz: createAction(ModuleEvents.UPDATE_QUIZ_ADMIN, async (params) => {
    return await QuizeRepository.onUpdateQuiz(params)
  }),

  updateQuestion: createAction(ModuleEvents.UPDATE_QUESTION_ADMIN, async (params, quizId) => {
    const data = await QuizeRepository.onUpdateQuestion(params)
    return { ...data, quizId }
  }),

  getCourseListByQuiz: createAction(ModuleEvents.GET_COURSE_LIST_BY_QUIZ, async () => {
    const data = await CommonRepository.courseList();
    return { ...data }
  }),

  resetAttempts: createAction(ModuleEvents.RESET_QUIZ_ATTEMPT_BY_ADMIN, async (params) => {
    return await QuizeRepository.resetAttempts(params);
  }),

  onGetAttemptgraph: createAction(ModuleEvents.GET_ATTEMPT_GRAPGH, async (params) => {
    return await QuizeRepository.onGetAttemptgraph(params);
  }),

  getAQuestionOfQuiz: createAction(ModuleEvents.GET_A_QUESTION_OF_QUIZ_BY_QID, async (params) => {
    return await QuizRepository.stdgetAQuizQuestion(params);
  }),

  getStudentQuizStatus: createAction(ModuleEvents.CHECK_QUIZ_CURRENT_STATUS_BY_STUDENT, async (params) => {
    return await QuizRepository.getStudentQuizState(params);
  }),

  getStudentsGraphData: createAction(ModuleEvents.GET_GRAPH_DATA, async (qId) => {
    return await QuizRepository.getGraphData(qId);
  }),
  
  addQuestiontoQuiz:createAction(ModuleEvents.ADD_QUESTION_TO_QUIZ, async(params)=>{
    return await QuizeRepository.addQuestiontoQuiz(params);
  }),
  removeQuestionfromQuiz:createAction(ModuleEvents.REMOVE_QUESTION_FROM_QUIZ, async(params)=>{
    const data = await QuizeRepository.removeQuestionfromQuiz(params)
    return { ...data,params } ;
  }),
  addGrades:createAction(ModuleEvents.ADD_GRADES, async(params)=>{
    const data = await QuizeRepository.addGrades(params);
    return { ...data,params } ;
  }),
  fetchGrades:createAction(ModuleEvents.FETCH_GRADES, async(params)=>{ 
    return await QuizeRepository.fetchGrades(params);
  }),
  updateGrade:createAction(ModuleEvents.UPDATE_GRADES, async(params)=>{ 
    return await QuizeRepository.updateGrade(params);
  })
};
