import {Map} from 'immutable';
import _ from 'lodash';
import {ModuleEvents} from './Actions';
//import { ModuleEvents as SigninEvent } from "../signin/Actions";

const InitialState = Map({
  loadingAction: {loading: false, action: {}},
  getAdminReviewList:{},
  approveAdminReview:{},
  addStudentReviewAdmin:{},
  getNonApprovedReviewsAdmin:[]
  
});



export const Reducer = (state = InitialState, action) => {
  const {payload, type} = action;
  switch (type) {
    case ModuleEvents.LOADING_STARTED: {
      return state.set('loadingAction', {loading: true, action: payload});
    }
    case ModuleEvents.LOADING_FINISHED: {
      return state.set('loadingAction', {loading: false, action: payload});
    }

    case ModuleEvents.ADD_STUDENT_REVIEW_BY_ADMIN: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', {});
        return state.set('addStudentReviewAdmin', data);
      }
      return state
    }

    case ModuleEvents.APPROVE_REVIEW_ADMIN: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', {});
        return state.set('approveAdminReview', data);
      }
      return state
    }

    case ModuleEvents.GET_NON_APPROVED_REVIEW_LIST_ADMIN: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', {});
        return state.set('getNonApprovedReviewsAdmin', data);
      }
      return state
    }
    
    case ModuleEvents.GET_REVIEW_LIST_ADMIN: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', {});
        return state.set('getAdminReviewList', data);
      }
      return state
    }
  }
  

  return state;
};
