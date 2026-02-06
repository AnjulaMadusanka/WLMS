import { Map } from 'immutable';
import _ from 'lodash';
import { ModuleEvents } from './Actions';
import { REST_PASSWORD_STATE } from '../../core/Constant';
import { ModuleEvents as CauseModuleEvent } from "../course/Actions";
import { Cases } from '@mui/icons-material';

const InitialState = Map({
  currentUser: {},
  resetPasswordState: REST_PASSWORD_STATE.ENTER_EMAIL,
  resetData: {},
  initCourse: [],
  sampleClass: [],
  freeOrientaion: {},
  verifyEmailData: {},
  signUpresponse:{},
  systemCurrency:[],
  currentCurrency:[],
  promoCodeDiscount:{},
  verifyData:{}
});



export const Reducer = (state = InitialState, action) => {
  const { payload, type } = action;
  switch (type) {

    case ModuleEvents.LOGIN_USER: {
      if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
        return state.set('currentUser', _.get(payload, 'data', {})).set('signUpresponse',{});
      }
      return state
    }

    case ModuleEvents.FORGOT_PASSWORD_STEP_ONE: {
      if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
        return state.set('resetPasswordState', REST_PASSWORD_STATE.OTP_VERIFICATION).set('resetData', _.get(payload, 'params', {}));
      }
      return state
    }

    case ModuleEvents.FORGOT_PASSWORD_STEP_TWO: {
      if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
        return state.set('resetPasswordState', REST_PASSWORD_STATE.RESET_PASSWORD).set('resetData', _.get(payload, 'params', {}));
      }
      return state
    }

    case ModuleEvents.FORGOT_PASSWORD_STEP_THREE: {
      if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
        return state.set('resetPasswordState', REST_PASSWORD_STATE.ENTER_EMAIL);
      }
      return state
    }

    case ModuleEvents.GOBACK_RESET_PASSWORD: {
      return state.set('resetPasswordState', REST_PASSWORD_STATE.ENTER_EMAIL).set('resetData', {});
    }
    case ModuleEvents.GET_VALIDATE_EMAIL: {
      return state.set('verifyEmailData', payload);
    }

    case ModuleEvents.CLEAN_VERIFIED_EMAIL_DATA: {
      return state.set('verifyEmailData', {});
    }

    case ModuleEvents.SIGN_UP: {
      return state.set('signUpresponse', payload).set('verifyEmailData', {}).set('promoCodeDiscount',{});
    }

    case CauseModuleEvent.ENROLL_NEW_COURSE_BY_REGISTERED_USER:{
      return state.set('signUpresponse', payload)
    }

    case ModuleEvents.GET_SYSTEM_CURRENCY:{
      if(payload && !payload.error && payload.status_code && payload.status_code == 1){
        const data = _.get(payload,'data',[]);
        return state.set('systemCurrency',data);
      }
      return state
    }

    case ModuleEvents.GET_PROMO_CODE_DISCOUNT:{
      if(payload && !payload.error && payload.status_code && payload.status_code == 1){
        const data =  _.get(payload, 'data', {});
        return state.set('promoCodeDiscount',data);
      }else{
        return state.set('promoCodeDiscount',payload);
      }
      
    }

    case ModuleEvents.VERIFY_TOKEN: {
      if(payload && !payload.error && payload.status_code && payload.status_code == 1){
        const data =  _.get(payload, 'data', {});
        return state.set('verifyData',data);
      }else{
        return state.set('verifyData',payload);
      }
    }


  }


  return state;
};
