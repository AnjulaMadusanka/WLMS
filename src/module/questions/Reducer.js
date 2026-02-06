import { Map } from 'immutable';
import _ from 'lodash';
import { ModuleEvents } from './Actions';
//import { ModuleEvents as SigninEvent } from "../signin/Actions";

const InitialState = Map({
  loadingAction: { loading: false, action: {} },
  categoryList: [],
  subjectList: [],
  questionList: [],
});



export const Reducer = (state = InitialState, action) => {
  const { payload, type } = action;
  switch (type) {


    case ModuleEvents.GET_CATEGORY_LIST: {
      if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
        const data = _.get(payload, 'data', []);
        return state.set('categoryList', data);
      }
      return state
    }
    case ModuleEvents.GET_SUBJECT_LIST: {
      if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
        const data = _.get(payload, 'data', []);
        return state.set('subjectList', data);
      }
      return state
    }
    case ModuleEvents.GET_QUESTIONS: {
      if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
        const data = _.get(payload, 'data', []);
        return state.set('questionList', data);
      }
      return state
    }

  }
  
  return state;
};
