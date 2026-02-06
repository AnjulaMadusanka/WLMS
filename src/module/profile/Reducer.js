import { Map } from 'immutable';
import _ from 'lodash';
import { ModuleEvents } from './Actions';
//import { ModuleEvents as SigninEvent } from "../signin/Actions";

const InitialState = Map({
  currentUser: {}
});



export const Reducer = (state = InitialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case ModuleEvents.GET_USER_DATA: {
      if(payload && !payload.error && payload.status_code && payload.status_code == 1){
        return state.set('currentUser', _.get(payload,'data',{}));
      }
    }
    
  }


  return state;
};
