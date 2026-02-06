import React from 'react';
import { Actions } from '../../core/modules/Actions';
import { ModuleEvents } from './Actions';
import { onToast } from '../../core/Constant';
// import {navigate} from '../../core/repository/Repository';

export default {
  [ModuleEvents.UPDATE_WEBINAR_STATUS_ADMIN]: ({ dispatch, payload, appState }) => {
    dispatch(Actions.webinar.getAllWebinarsAdmin());
    onToast('Webinar Status', payload, false);
  },

  [ModuleEvents.CREATE_WEBINAR_ADMIN]: ({ dispatch, payload, appState }) => {

    window.location.replace(payload.data)
    // dispatch(Actions.webinar.getAllWebinarsAdmin());
    // onToast('Webinar Status', payload, false);
  },

  [ModuleEvents.UPDATE_WEBINAR_ADMIN]: ({ dispatch, payload, appState }) => {
    dispatch(Actions.webinar.getAllWebinarsAdmin());
    onToast('Webinar Update', payload, false);
  },

  [ModuleEvents.DELETE_WEBINAR_ADMIN]: ({ dispatch, payload, appState }) => {
    dispatch(Actions.webinar.getAllWebinarsAdmin());
    onToast('Delete Webinar', payload, false);
  },

  [ModuleEvents.COMPLETE_WEBINAR_ADMIN]: ({ dispatch, payload, appState }) => {
    dispatch(Actions.webinar.getAllWebinarsAdmin());
    onToast('Live Class Complete', payload, false);
  },
  [ModuleEvents.GET_WEBINAR_LIST]: ({ dispatch, payload, appState }) => {
    if (payload == undefined || payload.status_code == 0) {
      onToast('Webinar Load  Failed! Please Select Course');
    }
  },
  [ModuleEvents.ADD_COURSE_TO_WEBINAR]: ({ dispatch, payload, appState }) => {
    if (payload && !payload.error && payload.status && payload.status_code == 1) {
      dispatch(Actions.webinar.getAllWebinarsAdmin());
      onToast('Course Added', payload, false);
    }
    else{
      onToast('Course Added Failed', payload, false);
    }
  }
};
