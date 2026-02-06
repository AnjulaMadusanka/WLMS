import React from 'react';
import {Actions} from '../../core/modules/Actions';
import {ModuleEvents} from './Actions';
import { onToast } from '../../core/Constant';
// import {navigate} from '../../core/repository/Repository';

export default {
  [ModuleEvents.UPDATE_USER_STATUS]: ({ dispatch, payload, appState }) => {
    dispatch(Actions.users.getAdminUserInfo({type: 1}));
    onToast('User Status', payload, false);
  },

  [ModuleEvents.UPDATE_USER]: ({ dispatch, payload, appState }) => {
    dispatch(Actions.users.getAdminUserInfo({type: 1}));
    onToast('User Details', payload, false);
  },

  [ModuleEvents.CREATE_ADMIN_USER]: ({ dispatch, payload, appState }) => {
    dispatch(Actions.users.getAdminUserInfo({type: 1}));
    onToast('Create User', payload, false);
  },

  [ModuleEvents.DELETE_USER]: ({ dispatch, payload, appState }) => {
    dispatch(Actions.users.getAdminUserInfo({type: 1}));
    onToast('Delete User', payload, false);
  },
};