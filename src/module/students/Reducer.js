import {Map} from 'immutable';
import _ from 'lodash';
import {ModuleEvents} from './Actions';
import { ModuleEvents as QuizEvent } from "../quizes/Actions";

const InitialState = Map({
  adminStudents: [],
  adminStudentCreateResponse:{},
  studentStatusUpdate:{},
  studentProgress:[],
  attemptData:[],
  studentCourseData:[]
});



export const Reducer = (state = InitialState, action) => {
  const {payload, type} = action;
  switch (type) {
    case ModuleEvents.GET_ADMIN_STUDENT_LIST:{
      if(payload && !payload.error && payload.status && payload.status_code == 1){
        const data = _.get(payload,'data',{});
        return state.set('adminStudents', data);
      }
      return state
    }

    case ModuleEvents.CREATE_ADMIN_STUDENT: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        // return state.set('currentUser', _.get(payload, 'data', {}));
        return state.set('adminStudentCreateResponse', payload);
      }
      return state
    }

    case ModuleEvents.UPDATE_STUDENT_STATUS: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        return state.set('studentStatusUpdate', payload);
      }
      return state
    }

    case ModuleEvents.GET_COURSE_LIST: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', {});
        return state.set('commonCourseList', data);
      }
      return state
    }


    case QuizEvent.GET_COURSE_LIST_BY_QUIZ: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', {});
        return state.set('commonCourseList', data);
      }
      return state
    }

    case ModuleEvents.GET_STUDENT_PROGRESS: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', {});
        return state.set('studentProgress', data);
      }
      return state
    }
    case ModuleEvents.GET_STUDENT_ATTEMPTDETAILS: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', {});
        return state.set('attemptData', data);
      }
      if (payload.status_code == 0) {
        return state.set('attemptData', {});
      }
      return state
    }

    case ModuleEvents.GET_ADMIN_STUDENT_COURSEDETAILS: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', {});
        return state.set('studentCourseData', data);
      }
      return state
    }

  }
  

  return state;
};
