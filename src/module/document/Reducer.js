import { Map } from 'immutable';
import _ from 'lodash';
import { ModuleEvents } from './Actions';
//import { ModuleEvents as SigninEvent } from "../signin/Actions";

const InitialState = Map({
  documentList: [],



});



export const Reducer = (state = InitialState, action) => {
  const { payload, type } = action;
  switch (type) {

   case ModuleEvents.GET_DOCUMENTLIST: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', {});
        return state.set('documentList', data);
      }
      return state
    }

  }
  return state;
};
