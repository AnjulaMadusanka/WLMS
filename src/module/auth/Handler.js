import React from 'react';
import { Actions } from '../../core/modules/Actions';
import { ModuleEvents } from './Actions';
import _ from "lodash";
import { appHistory } from '../../core/modules/StoreCreator';
import { navigateTo } from '../../core/services/NavigationServicd';
import { USER_ROLE, onToast } from '../../core/Constant';
import Swal from 'sweetalert2'

export default {
  [ModuleEvents.LOGIN_USER]: ({ dispatch, payload, appState }) => {
    if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
      const token = _.get(payload, 'data.token', null);
      const userId = _.get(payload, 'data.user.id', null);
      const userType = _.get(payload, 'data.user_type', null);
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('userType', USER_ROLE[userType]);

        if (USER_ROLE.student == USER_ROLE[userType]) {
          onStudentnLoading({ dispatch, payload, appState })
        } else {
          onAddminLoading({ dispatch, payload, appState });
        }
      }
    } else {
      let value= payload;
      let title = 'Login Error'
      if(!payload){
        title='Network Error'
        value = {
         message: 'Please check your internet connection',
        status_code:0
        }
      }
      onToast(title, value);
    }
  },

  [ModuleEvents.LOGOUT_USER]: ({ dispatch, payload, appState }) => {
    const deviceId = localStorage.getItem('DeviceId')
    localStorage.clear()
    localStorage.setItem('DeviceId',deviceId)
    onToast('Logout', payload);
  },

  [ModuleEvents.FORGOT_PASSWORD_STEP_ONE]: ({ dispatch, payload, appState }) => {
    onToast('Forgot Password', payload, false);
  },

  [ModuleEvents.FORGOT_PASSWORD_STEP_TWO]: ({ dispatch, payload, appState }) => {
    onToast('Forgot Password', payload, false);
  },

  [ModuleEvents.FORGOT_PASSWORD_STEP_THREE]: ({ dispatch, payload, appState }) => {
    onToast('Reset Password', payload, false);
  },

  [ModuleEvents.SIGN_UP]: async ({ dispatch, payload, appState }) => {
    if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
      const data = _.get(payload, 'params', {})
      dispatch(Actions.auth.logIn({ ...data }));
      dispatch(Actions.auth.cleanVerifiedEmailData())
    }
    onToast('Sign up', payload, false)
  },

  

  [ModuleEvents.VERIFY_TOKEN]: ({ dispatch, payload, appState }) => {
    if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
      const userType = _.get(payload, 'data.user_type', null);
      localStorage.setItem('userType', USER_ROLE[userType]);
      const path = window.location.pathname;
      if (path == '/' || path == '/*') {
        if (USER_ROLE.student == USER_ROLE[userType]) {
          onStudentnLoading({ dispatch, payload, appState })
        } else {
          onAddminLoading({ dispatch, payload, appState });
        }
      }
      //else{
      //   navigateTo(path)
      // }


    } else {
      const path = window.location.pathname;
      if (path == '/' || path == '/welcome') {

      }else{
       navigateTo('/')
      }
      localStorage.removeItem('token')
    
    }

  },
};


const onAddminLoading = ({ dispatch, payload, appState }) => {
  navigateTo('/admin-dashboard');
  dispatch(Actions.home.getAdminDashboardData());
  dispatch(Actions.profile.getUserData());
}


const onStudentnLoading = ({ dispatch, payload, appState }) => {
  navigateTo('/dashboard');
  dispatch(Actions.profile.getUserData());
}