import {Map} from 'immutable';
import _ from 'lodash';
import {ModuleEvents} from './Actions';

const InitialState = Map({
  userList: [],
  userStatus:{},
  deleteUser:{},
  updateUser:{},
});



export const Reducer = (state = InitialState, action) => {
  const {payload, type} = action;
  switch (type) {
 
    case ModuleEvents.GET_ADMIN_USER_LIST:{
      if(payload && !payload.error && payload.status && payload.status_code == 1){
        const data = _.get(payload,'data',{});
        return state.set('userList', data);
      }
      return state
    }

    case ModuleEvents.UPDATE_USER_STATUS:{
      if(payload && !payload.error && payload.status && payload.status_code == 1){
        const data = _.get(payload,'data',{});
        return state.set('userStatus', data);
      }
      return state
    }

    case ModuleEvents.DELETE_USER:{
      if(payload && !payload.error && payload.status && payload.status_code == 1){
        const data = _.get(payload,'data',{});
        return state.set('deleteUser', data);
      }
      return state
    }

    case ModuleEvents.UPDATE_USER: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', {});
        return state.set('updateUser', data);
      }
      return state
    }




  }
  

  return state;
};



