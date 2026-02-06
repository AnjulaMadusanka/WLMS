import {Map} from 'immutable';
import _ from 'lodash';
import {ModuleEvents} from './Actions';
//import { ModuleEvents as SigninEvent } from "../signin/Actions";

const InitialState = Map({
  stdAnnouncementList:[],
  resetData:false,
  adminAnnoucementList:[],
  adminAnnoucement:[],
});



export const Reducer = (state = InitialState, action) => {
  const {payload, type} = action;
  switch (type) {
    case ModuleEvents.POST_ANNOUNCEMENT: {
      if(payload && payload.status_code == 1) {
        return state.set('resetData',true);
      }else{
        return state.set('resetData',false);
      }
    }

    case ModuleEvents.GET_STUDENT_ANNOUNCEMENT:{
      if(payload && !payload.error && payload.status_code && payload.status_code == 1){
        return state.set('stdAnnouncementList', _.get(payload,'data',[]));
      }
      return state;
    }

    case ModuleEvents.GET_ALL_ADMIN_ANNOUNCEMENT:{
      if(payload && !payload.error && payload.status_code && payload.status_code == 1){
        return state.set('adminAnnoucementList', _.get(payload,'data',[]));
      }
      return state;
    }

    case ModuleEvents.GET_ADMIN_ANNOUNCEMENT:{
      if(payload && !payload.error && payload.status_code && payload.status_code == 1){
        return state.set('adminAnnoucement', _.get(payload,'data',[]));
      }
      return state;
    }
  }
  return state;
};
