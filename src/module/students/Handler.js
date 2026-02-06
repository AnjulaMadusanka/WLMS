import React from 'react';
import {Actions} from '../../core/modules/Actions';
import {ModuleEvents} from './Actions';
import { onToast } from '../../core/Constant';
import { navigateTo, goBack } from '../../core/services/NavigationServicd';
// import {navigate} from '../../core/repository/Repository';

export default {
  [ModuleEvents.UPDATE_STUDENT_STATUS]: ({ dispatch, payload, appState }) => {
    dispatch(Actions.students.getAdminUserDetails({type: 2}));
    onToast('Student Status', payload, false);
  },

  [ModuleEvents.CREATE_ADMIN_STUDENT]: ({ dispatch, payload, appState }) => {
    dispatch(Actions.students.getAdminUserDetails({type: 2}));
    onToast('Student Status', payload, false);
  },

  [ModuleEvents.CREATE_ADMIN_STUDENT_BY_COURSE]: ({ dispatch, payload, appState }) => {
    dispatch(Actions.students.getAdminUserDetails({type: 2}));
    onToast('Student Status', payload, false);
    navigateTo(-1)

  },
};
