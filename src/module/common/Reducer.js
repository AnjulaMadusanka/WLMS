import {Map} from 'immutable';
import _ from 'lodash';
import {ModuleEvents} from './Actions';
//import { ModuleEvents as SigninEvent } from "../signin/Actions";

const InitialState = Map({
  loadingAction: {loading: false, action: {}},
  show:false,
  version:''
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

    case ModuleEvents.GET_ACTIVE_FLAG: {
      return state.set('show', _.get(payload, 'data.currency_display', false));
    }

    case ModuleEvents.GET_APP_VERSION: {
      return state.set('version', _.get(payload, 'data[0].version', ''));
    }
   
  }
  

  return state;
};
