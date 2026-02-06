import { Map } from 'immutable';
import _ from 'lodash';
import { ModuleEvents } from './Actions';
//import { ModuleEvents as SigninEvent } from "../signin/Actions";

const InitialState = Map({
  stdquizList: [],
  startData: {},
  questions: [],
  attemptsData: [],
  completeData: [],
  quizList: [],
  quizData: {},
  quizSubmissionHistory: [],
  courseWeekQuiz: [],
  createdQuizData: {},
  questionAndAnswersList: [],
  assessmentDetails: {},
  quizFeedback: {},
  assessmentFormQnR: {},
  studentAnswers: {},
  isQuizStarted: false,
  updateQuiz:[],
  graphData:[],

  quizDataNew:{},
  currentQuestion:{},
  quizState:{},
  studentsGraphData:{},
  studentCategoryGraphData:[],
  addGrades:{},
  gradeList:[],
  updateGrades:{}
});



export const Reducer = (state = InitialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case ModuleEvents.STD_GET_QUIZ_LIST: {
      if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
        const data = _.get(payload, 'data', {});
        return state.set('stdquizList', data);
      }
      return state
    }
    case ModuleEvents.STD_START_QUIZ: {
      if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
        const data = _.get(payload, 'data', {});
        return state.set('startData', data).set('isQuizStarted', true);
      }
      return state
    }
    // case ModuleEvents.STD_GET_QUESTIONS: {
    //   if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
    //     const data = _.get(payload, 'data', {});
    //     return state.set('questions', data);
    //   }
    //   return state
    // }
    case ModuleEvents.STD_GET_ATTEMPTS: {
      if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
        const data = _.get(payload, 'data', {});
        return state.set('attemptsData', data);
      }
      return state
    }
    case ModuleEvents.STD_COMPLETE_QUIZ: {
      if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
        const data = _.get(payload, 'data', {});
        return state.set('completeData', data).set('quizState', {}).set('quizDataNew',{}).set('questions',[]).set('currentQuestion',{}).set('startData', {}).set('isQuizStarted', false);
      }
      return state
    }
    case ModuleEvents.STD_STUDENT_ANSWERS: {
      if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
        const data = _.get(payload, 'data', {});
        return state.set('studentAnswers', data);
      }
      return state
    }
    case ModuleEvents.GET_ALL_QUIZE_LIST: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const list = _.get(payload, 'data', []);
        return state.set('quizList', list)
      }
      return state
    }

    case ModuleEvents.GET_QUIZ_DATA: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', {});
        return state.set('quizData', data)
      }
      return state
    }

    case ModuleEvents.GET_QUIZ_SUBMISSION_HISTORY: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const list = _.get(payload, 'data', []);
        return state.set('quizSubmissionHistory', list)
      }
      return state
    }

    case ModuleEvents.GET_COURSE_WEEK_DATA_LIST: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', []);
        return state.set('courseWeekQuiz', data)
      }
      return state
    }

    case ModuleEvents.CREATE_QUIZE: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', {});
        return state.set('createdQuizData', data)
      }
      return state
    }

    case ModuleEvents.GET_QUIZ_AND_ANSWER_BY_QUIZ_ID: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', []);
        return state.set('questionAndAnswersList', data)
      }
      return state
    }


    case ModuleEvents.GET_ASSESSMENT_FORM_DETAILS: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', []);
        return state.set('assessmentDetails', data)
      }
      return state
    }

    case ModuleEvents.ADD_FEEDBACK_QUIZ_ADMIN: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', []);
        return state.set('quizFeedback', data);
      }
      return state
    }

    case ModuleEvents.GET_ASSESSMENT_QUESTION_N_REASON: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', []);
        return state.set('assessmentFormQnR', data);
      }
      return state
    }

    case ModuleEvents.CALL_FOR_CHANGEING_START_QUIZ_STATE: {
      return state.set('isQuizStarted',payload);
    }

    case ModuleEvents.GET_ASSESSMENT_QUESTION_N_REASON_ADMIN: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', []);
        return state.set('assessmentFormQnR', data);
      }
      return state
    }

    case ModuleEvents.UPDATE_QUIZ_ADMIN: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', {});
        return state.set('updateQuiz', data);
      }
      return state
    }

    case ModuleEvents.GET_ATTEMPT_GRAPGH: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', {});
        return state.set('graphData', data);
      }
      return state
    }

    case ModuleEvents.GET_A_QUESTION_OF_QUIZ_BY_QID: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data.data', {});
        console.log(_.get(data,'current_question',{}),"p[oo[po[o",data)
        return state.set('quizDataNew', data).set('questions',_.get(data,'questions_feedback',[])).set('currentQuestion',_.get(data,'current_question',{}));
      }else{
        return state.set('quizDataNew',{}).set('questions',[]).set('currentQuestion',{}).set('startData', {}).set('isQuizStarted', false);
      }
    }


    case ModuleEvents.CHECK_QUIZ_CURRENT_STATUS_BY_STUDENT: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', {});
        return state.set('quizState', data).set('quizDataNew',{}).set('questions',[]).set('currentQuestion',{}).set('startData', {}).set('isQuizStarted', false);
      }
      return state
    }

    case ModuleEvents.GET_GRAPH_DATA: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', []);
        return state.set('studentsGraphData', _.get(data,'quiz_results',{})).set('studentCategoryGraphData', _.get(data,'category_results',[]));
      }
      return state
    }
    case ModuleEvents.ADD_GRADES: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', {});
        return state.set('addGrades', data);
      }
      return state
    }
    case ModuleEvents.UPDATE_GRADES: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', {});
        return state.set('updateGrades', data);
      }
      return state
    }
    case ModuleEvents.FETCH_GRADES: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', []);
        return state.set('gradeList', data);
      }
      return state
    }

  }




  return state;
};


