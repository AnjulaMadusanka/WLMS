import {Map} from 'immutable';
import _ from 'lodash';
import {ModuleEvents} from './Actions';
//import { ModuleEvents as SigninEvent } from "../signin/Actions";

const InitialState = Map({
  adminDashboardData :{},
  userDashboardData:[],
  courseprogress:[],
  liveWebinar:[]
});



export const Reducer = (state = InitialState, action) => {
  const {payload, type} = action;
  switch (type) {

    case ModuleEvents.GET_ADMIN_DASHBOARD_DATA:{
      if(payload && !payload.error && payload.status_code && payload.status_code == 1){
        const data = _.get(payload,'data',{});
        return state.set('adminDashboardData',data);
      }
      return state
    }

    case ModuleEvents.GET_FORUM_DATA:{
      if(payload && !payload.error && payload.status_code && payload.status_code == 1){
        const data = _.get(payload,'data',{});
        return state.set('userDashboardData',data);
      }
      return state
    }
    case ModuleEvents.GET_COURSE_PROGRESS:{
      if(payload && !payload.error && payload.status_code && payload.status_code == 1){
        const data = _.get(payload,'data',{});
        return state.set('courseprogress',data);
      }
      return state
    }
    case ModuleEvents.GET_LIVE_WEBINAR:{
      if(payload && !payload.error && payload.status_code && payload.status_code == 1){
        const data = _.get(payload,'data',[]);
        return state.set('liveWebinar',data);
      }
      return state
    }
  }
  

  return state;
};
