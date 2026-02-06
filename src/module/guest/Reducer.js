import { Map } from 'immutable';
import _ from 'lodash';
import { ModuleEvents } from './Actions';
import { REST_PASSWORD_STATE } from '../../core/Constant';
//import { ModuleEvents as SigninEvent } from "../signin/Actions";

const InitialState = Map({
  initCourse :[],
  topBannerCourses:[],
  sampleClass:[],
  freeOrientaion:{}
});



export const Reducer = (state = InitialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case ModuleEvents.GET_INITIAL_COURSE_DETAILS: {
      if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
        return state.set('initCourse', _.get(payload, 'data.otherCourses', [])).set('topBannerCourses', _.get(payload, 'data.topBannerCourses',[]));
      }
      return state
    }
    case ModuleEvents.GET_SAMPLE_CLASS: {
      if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
        return state.set('sampleClass', _.get(payload, 'data', {}));
      }
      return state
    }
    case ModuleEvents.FREE_ORIENTATION: {
      if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
        return state.set('freeOrientaion', _.get(payload, 'data', {}));
      }
      return state
    }
  }
  return state;
};
