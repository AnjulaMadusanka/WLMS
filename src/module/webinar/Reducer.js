import { Map } from 'immutable';
import _ from 'lodash';
import { ModuleEvents } from './Actions';
//import { ModuleEvents as SigninEvent } from "../signin/Actions";

const InitialState = Map({
  loadingAction: { loading: false, action: {} },
  createAdminwebinar: {},
  getAdminAllWebinarList: [],
  getAdminWebinarById: {},
  updateAdminWebinar: {},
  updateAdminWebinarStatus: {},
  deleteAdminWebinar: {},
  webinarList:{}
});



export const Reducer = (state = InitialState, action) => {
  const { payload, type } = action;
  switch (type) {



    case ModuleEvents.CREATE_WEBINAR_ADMIN: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', {});
        return state.set('createAdminwebinar', data);
      }
    }

    case ModuleEvents.GET_WEBINAR_LIST: {
      if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
        const data = _.get(payload, 'data', {});
        return state.set('webinarList', data);
      }
      return state
    }

    case ModuleEvents.GET_WEBINAR_LIST_ADMIN: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', {});
        return state.set('getAdminAllWebinarList', data);
      }
      return state
    }


    case ModuleEvents.GET_WEBINAR_DETAILS_BY_ID_ADMIN: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', {});
        return state.set('getAdminWebinarById', data);
      }
      return state
    }


    case ModuleEvents.UPDATE_WEBINAR_ADMIN: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', {});
        return state.set('updateAdminWebinar', data);
      }
      return state
    }

    case ModuleEvents.UPDATE_WEBINAR_STATUS_ADMIN: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', {});
        return state.set('updateAdminWebinarStatus', data);
      }
      return state
    }


    case ModuleEvents.DELETE_WEBINAR_ADMIN: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', {});
        return state.set('deleteAdminWebinar', data);
      }
      return state
    }


  }
  
  return state;
};
