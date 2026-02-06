import {Map} from 'immutable';
import _ from 'lodash';
import {ModuleEvents} from './Actions';
//import { ModuleEvents as SigninEvent } from "../signin/Actions";

const InitialState = Map({
  loadingAction: {loading: false, action: {}},
  studentReportDataList:[],
  paymentReportDataList:[],
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
    case ModuleEvents.STUDENT_REPORT_DATA:{
      if(payload && !payload.error && payload.status && payload.status_code == 1){
        const data = _.get(payload,'data',{});
      
        return state.set('studentReportDataList', data);
      }
      return state
    }
    case ModuleEvents.PAYMENT_REPORT_DATA:{
      if(payload && !payload.error && payload.status && payload.status_code == 1){
        const data = _.get(payload,'data',{});
        return state.set('paymentReportDataList', data);
      }
      return state
    }
  }
  

  return state;
};
