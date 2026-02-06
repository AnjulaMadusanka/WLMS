import {Map} from 'immutable';
import _ from 'lodash';
import {ModuleEvents} from './Actions';
//import { ModuleEvents as SigninEvent } from "../signin/Actions";

const InitialState = Map({
  loadingAction: {loading: false, action: {}},
  uploadedVideoList:[],
  popupClose:false,
  resetData: {},
});



export const Reducer = (state = InitialState, action) => {
  const {payload, type} = action;
  switch (type) {
   
    case ModuleEvents.FETCH_ALL_VIDEO: {
    
      if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
        const data = _.get(payload,'data',{});
        
        return state.set('uploadedVideoList',data);
      }
      return state
    }
    
    case ModuleEvents.UPLOAD_VIDEO: {
      
      return state.set("popupClose",false);
    }
  }
  

  return state;
};
