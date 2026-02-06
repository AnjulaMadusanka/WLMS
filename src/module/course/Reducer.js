import { Map } from 'immutable';
import _ from 'lodash';
import { ModuleEvents } from './Actions';
import {Actions} from '../../core/modules/Actions';
//import { ModuleEvents as SigninEvent } from "../signin/Actions";

const InitialState = Map({
  commonCourseList: [],
  stdCourseList:[],
  mainDetailsState:{},
  coursecatalog:[],
  coursedetails:[],
  course:[],
  videoStatus:[],
  allStatusCourseList:[],
  courseContent:[],
  courseQuizList:[],
  reviewState:0,
  systemParams:'',
  courseStudentsList:[],
  signedUrl:[],
  notRegisteredInACourse:[],
  courseCurrencies:[],
});



export const Reducer = (state = InitialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case ModuleEvents.GET_COURSE_LIST: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {

        const data = _.get(payload, 'data', {});
        return state.set('commonCourseList', data);
      }
      return state
    }
    case ModuleEvents.GET_STD_COURSE_LIST: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', {});
        return state.set('stdCourseList', data);
      }
      return state
    }
    case ModuleEvents.GET_COURSE_MAIN_DETAILS: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', {});
        return state.set('mainDetailsState', data);
      }
      return state
    }
    case ModuleEvents.GET_COURSE_CATALOG: {
      if(payload && !payload.error && payload.status_code && payload.status_code == 1){
        const data = _.get(payload,'data',{});
        return state.set('coursecatalog',data);
      }
      return state
    }
    case ModuleEvents.GET_COURSE_DETAILS: {
      if(payload && !payload.error && payload.status_code && payload.status_code == 1){
        const data = _.get(payload,'data',{});

        return state.set('coursedetails',data.courses).set('course',data);
      }
      return state
    }
    case ModuleEvents.SET_VIDEO_COMPLETED: {
      if(payload && !payload.error && payload.status_code && payload.status_code == 1){
        const data = _.get(payload,'data',{});

        return state.set('videoStatus',data);
      }
      return state
    }
    case ModuleEvents.GET_ALL_STATUS_COURSE_LIST: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {

        const data = _.get(payload, 'data', {});
        return state.set('allStatusCourseList', data);
      }
      return state
    }
    case ModuleEvents.GET_COURSE_CONTENT: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', {});
        return state.set('courseContent', data);
      }
      return state
    }
    case ModuleEvents.GET_COURSE_QUIZ_LIST: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', {});
        return state.set('courseQuizList', data);
      }
      return state
    }

    case ModuleEvents.ADD_STUDENT_REVIEW_STATUS: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', {});
        return state.set('reviewState', data);
      }
      return state
    }

    case ModuleEvents.GET_SYSTEM_PARAMS: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', '');
        return state.set('systemParams', data);
      }
      return state
    }

    case ModuleEvents.GET_COURSE_STUDENT_LIST_BY_ADMIN:{
      if(payload && !payload.error && payload.status && payload.status_code == 1){
        const data = _.get(payload,'data',{});
        return state.set('courseStudentsList', data);
      }else{
        return state.set('courseStudentsList', []);
      }
    }
    case ModuleEvents.CLEAR_STORE: {
        return state.set('course', []);
    }
    case ModuleEvents.GET_SIGNED_URL: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {

        const data = _.get(payload, 'data', {});
        console.log(data,'daataaaa palayod')
        return state.set('signedUrl', data);
      }
      return state
    }

    case ModuleEvents.GET_STUDENT_LIST_NOT_REGISTERED_IN_A_COURSE: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', '');
        return state.set('notRegisteredInACourse', data);
      }
      return state
    }
    
    case ModuleEvents.GET_COURSE_CURRENCIES: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', {});
        return state.set('courseCurrencies', data);
      }
      return state
    }
  }

  return state;
};
