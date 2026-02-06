import React from 'react';
import { Actions } from '../../core/modules/Actions';
import { ModuleEvents } from './Actions';
import { onToast } from '../../core/Constant';
import { navigateTo } from '../../core/services/NavigationServicd';
import _ from "lodash";
// import {navigate} from '../../core/repository/Repository';

export default {
  [ModuleEvents.STD_START_QUIZ]: ({ dispatch, payload, appState }) => {
    if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
      console.log('payload startttt', payload)
      const qId = payload?.data?.first_question_id;
      const quizId = payload?.data?.quiz_id
      dispatch(Actions.quizes.getAQuestionOfQuiz({qId, quizId}))
      // { qId: 477, quizId: 15 }
    }
    else {
      //  const quizData = _.get(payload,'params',{});
      //   const qD = localStorage.getItem('quiz');
      //   const dataList = JSON.parse(qD);
      //   const list = _.filter(dataList, item => item.quizId != quizData?.quiz_id);
      //   localStorage.setItem('quiz', JSON.stringify(list));
      onToast('Quiz  Error', payload, false);
    }
  },
  [ModuleEvents.STD_STUDENT_ANSWERS]: ({ dispatch, payload, appState }) => {
    if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
      // 
      dispatch(Actions.quizes.getAQuestionOfQuiz(payload?.nextData))
    }
    else {
      onToast('Quiz  Error', payload, false);
    }
  },

  [ModuleEvents.DELETE_QUIZE]: ({ dispatch, payload, appState }) => {
    if (payload && !payload.error && payload.status && payload.status_code == 1) {
      dispatch(Actions.quizes.getQuizeList());
    }
    onToast('Delete Quiz', payload, false);

  },

  [ModuleEvents.UPDATE_QUIZ_STATE]: ({ dispatch, payload, appState }) => {
    if (payload && !payload.error && payload.status && payload.status_code == 1) {
      dispatch(Actions.quizes.getQuizeList());
    }
    onToast('Update Quiz', payload, false);

  },

  [ModuleEvents.CREATE_QUIZE]: ({ dispatch, payload, appState }) => {
    if (payload && !payload.error && payload.status && payload.status_code == 1) {
      dispatch(Actions.quizes.getQuizeList());
      localStorage.setItem('newQuiz', JSON.stringify(_.get(payload, 'data', {})));
      navigateTo('/admin-quiz-second');
    }
    onToast('Create Quiz', payload, false);

  },

  [ModuleEvents.CREATE_QUESTION]: ({ dispatch, payload, appState }) => {
    if (payload && !payload.error && payload.status && payload.status_code == 1) {
      dispatch(Actions.quizes.getQuizQuestionAndAnswerByQuizId(payload?.quizId));
    }
    onToast('Create Question', payload, false);

  },

  [ModuleEvents.DELETE_QUESTION]: ({ dispatch, payload, appState }) => {
    if (payload && !payload.error && payload.status && payload.status_code == 1) {
      dispatch(Actions.quizes.getQuizQuestionAndAnswerByQuizId(payload?.quizId));
    }
    onToast('Delete Question', payload, false);

  },

  [ModuleEvents.ADD_FEEDBACK_QUIZ_ADMIN]: ({ dispatch, payload, appState }) => {
    if (payload && !payload.error && payload.status && payload.status_code == 1) {

    }
    onToast('Add Feedback', payload, false);
  },

  [ModuleEvents.STD_COMPLETE_QUIZ]: ({ dispatch, payload, appState }) => {
    if (payload && !payload.error && payload.status && payload.status_code == 1) {
      navigateTo('/quiz-attempt', { state: { quiz: { id: payload?.data.quiz_id, name: payload?.data.quiz_name } } });
      const qD = localStorage.getItem('quiz');
      const dataList = JSON.parse(qD);
      const list = _.filter(dataList, item => item.quizId != payload?.quizId);
      localStorage.setItem('quiz', JSON.stringify(list));
    }
    onToast('Submit quiz', payload, false);
  },

  [ModuleEvents.DELETE_ATTEMPT]: ({ dispatch, payload, appState }) => {
    if (payload && !payload.error && payload.status && payload.status_code == 1) {
      dispatch(Actions.quizes.getQuizSumbissionHistory());
    }
    onToast('Delete Attempt', payload, false);

  },

  [ModuleEvents.STD_GET_QUIZ_LIST]: ({ dispatch, payload, appState }) => {
    if (payload == undefined || payload.status_code == 0) {
      onToast('Quiz Load Attempt Failed Please Select Course');
    }
  },

  [ModuleEvents.UPDATE_QUIZ_ADMIN]: ({ dispatch, payload, appState }) => {
    if (payload && !payload.error && payload.status && payload.status_code == 1) {
      dispatch(Actions.quizes.getQuizeList());
      localStorage.setItem('newQuiz', JSON.stringify(_.get(payload, 'data', {})));
      navigateTo('/admin-quiz-edit-second');
    }
    onToast('Update Quiz', payload, false);

  },

  [ModuleEvents.UPDATE_QUESTION_ADMIN]: ({ dispatch, payload, appState }) => {
    if (payload && !payload.error && payload.status && payload.status_code == 1) {
      dispatch(Actions.quizes.getQuizQuestionAndAnswerByQuizId(payload?.quizId));
    }
    onToast('Update Question', payload, false);

  },

  [ModuleEvents.RESET_QUIZ_ATTEMPT_BY_ADMIN]: ({ dispatch, payload, appState }) => {
    if (payload && !payload.error && payload.status && payload.status_code == 1) {
      dispatch(Actions.quizes.getQuizSumbissionHistory());
    }
    onToast('Reset Quiz attempt', payload, false);
  },

  [ModuleEvents.GET_A_QUESTION_OF_QUIZ_BY_QID]: ({ dispatch, payload, appState }) => {
    if (payload && !payload.error && payload.status && payload.status_code == 1) {
      
    }else{
      onToast('No Attempts', payload, false);
      navigateTo('/quiz')
    }
    

  },
  [ModuleEvents.ADD_QUESTION_TO_QUIZ ]: ({ dispatch, payload, appState }) => {
    if (payload && !payload.error && payload.status && payload.status_code == 1) {  
     // dispatch(Actions.quizes.getQuizQuestionAndAnswerByQuizId(payload?.quizId));
      // navigateTo('/admin-quiz-second')
    }
    onToast('Questions Add', payload, false);
  },
  [ModuleEvents.REMOVE_QUESTION_FROM_QUIZ ]: ({ dispatch, payload, appState }) => {
    if (payload && !payload.error && payload.status && payload.status_code == 1) {  
     dispatch(Actions.quizes.getQuizQuestionAndAnswerByQuizId(payload?.params.
      quiz_id
      ));
      // navigateTo('/admin-quiz-second')
    }
    onToast('Questions Remove', payload, false);
  },
  [ModuleEvents.ADD_GRADES]: ({ dispatch, payload, appState }) => {
    if (payload && !payload.error && payload.status && payload.status_code == 1) {
      dispatch(Actions.quizes.fetchGrades({
        quiz_id
        : payload?.params.
        quiz_id , category_id : payload?.params.category_id
        }));
    }
    onToast('Grade Add', payload, false);
  },
  [ModuleEvents.UPDATE_GRADES]: ({ dispatch, payload, appState }) => {
    if (payload && !payload.error && payload.status && payload.status_code == 1) {
 
    }
    onToast('Update Grade', payload, false);
  }


};



