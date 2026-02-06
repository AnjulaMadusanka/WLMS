import React from 'react';
import { Actions } from '../../core/modules/Actions';
import { ModuleEvents } from './Actions';
import { onToast } from '../../core/Constant';
// import {navigate} from '../../core/repository/Repository';

export default {
  [ModuleEvents.ADD_CATEGORY]: ({ dispatch, payload, appState }) => {
    dispatch(Actions.questions.getCategoryList());
    onToast('Cluster Add', payload, false);
  },
  [ModuleEvents.EDIT_CATEGORY]: ({ dispatch, payload, appState }) => {
    dispatch(Actions.questions.getCategoryList());
    onToast('Cluster Update', payload, false);    
  },
  [ModuleEvents.DELETE_CATEGORY]: ({ dispatch, payload, appState }) => {    
    dispatch(Actions.questions.getCategoryList());
    onToast('Cluster Delete', payload, false);    
  },
  [ModuleEvents.ADD_SUBJECT]: ({ dispatch, payload, appState }) => {    
    dispatch(Actions.questions.getSubjectList());
    onToast('Subject Add', payload, false);    
  },
  [ModuleEvents.EDIT_SUBJECT]: ({ dispatch, payload, appState }) => {    
    dispatch(Actions.questions.getSubjectList());
    onToast('Subject Update', payload, false);    
  },
  [ModuleEvents.ADD_QUESTION]: ({ dispatch, payload, appState }) => {
    console.log(payload, 'payload');
    if(payload.quizId.id){
      dispatch(Actions.quizes.addQuestiontoQuiz({quiz_id:payload?.quizId.id, question_ids:[payload?.data.id]}));
      dispatch(Actions.quizes.getQuizQuestionAndAnswerByQuizId(payload?.quizId.id));
    }
    else{
      onToast('Question Add', payload, false);    
    }

    dispatch(Actions.questions.getQuestions());
   //onToast('Question Add', payload, false);    
  },
  [ModuleEvents.DELETE_SUBJECT]: ({ dispatch, payload, appState }) => {
    dispatch(Actions.questions.getSubjectList());
    onToast('Subject Delete', payload, false);
  },
  [ModuleEvents.EDIT_QUESTION]: ({ dispatch, payload, appState }) => {
    dispatch(Actions.questions.getQuestions());
    onToast('Question Update', payload, false);
  }

  }
;
