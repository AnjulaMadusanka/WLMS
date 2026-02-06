import { createAction } from '../../core/AppUtils';
import { AuthRepository, CommonRepository, GuestRepository } from '../../core/repository';

export const ModuleEvents = {
  LOGIN_USER: "LOGIN_USER",
  LOGOUT_USER: "LOGOUT_USER",
  FORGOT_PASSWORD_STEP_ONE: "FORGOT_PASSWORD_STEP_ONE",
  FORGOT_PASSWORD_STEP_TWO: "FORGOT_PASSWORD_STEP_TWO",
  FORGOT_PASSWORD_STEP_THREE: "FORGOT_PASSWORD_STEP_THREE",
  GOBACK_RESET_PASSWORD: "GOBACK_RESET_PASSWORD",
  SIGN_UP: "SIGN_UP",
  VERIFY_TOKEN: 'VERIFY_TOKEN',
  GET_VALIDATE_EMAIL: "GET_VALIDATE_EMAIL",
  CLEAN_VERIFIED_EMAIL_DATA: "CLEAN_VERIFIED_EMAIL_DATA",
  GET_SYSTEM_CURRENCY: "GET_SYSTEM_CURRENCY",
  SET_SYSTEM_CURRENCY: "SET_SYSTEM_CURRENCY",
  GET_PROMO_CODE_DISCOUNT: 'GET_PROMO_CODE_DISCOUNT'
};

export default {
  logIn: createAction(ModuleEvents.LOGIN_USER, async (params) => {
    return await AuthRepository.login(params);
  }, { loading: true, errorMessage: 'Error occured while login up. Please try again.' }),

  logOut: createAction(ModuleEvents.LOGOUT_USER, async () => {
    return await AuthRepository.onSignOut();
  }),

  forgotPassword: createAction(ModuleEvents.FORGOT_PASSWORD_STEP_ONE, async (params) => {
    const data = await AuthRepository.forgotPassword(params);
    return { ...data, params }
  }),

  verifyEmailForReset: createAction(ModuleEvents.FORGOT_PASSWORD_STEP_TWO, async (params) => {
    const data = await AuthRepository.verifyForogotPasswordAccount(params);
    return { ...data, params }
  }),

  resetPassword: createAction(ModuleEvents.FORGOT_PASSWORD_STEP_THREE, async (params) => {
    return await AuthRepository.resetForgotPassword(params);
  }),
  goBackResetPassword: createAction(ModuleEvents.GOBACK_RESET_PASSWORD, data => data),

  signUp: createAction(ModuleEvents.SIGN_UP, async (params) => {
    const data = await AuthRepository.signUp(params);
    return { ...data, params }
  }, { loading: true, errorMessage: 'Error occured while signing up. Please try again.' }),

  verifyToken: createAction(ModuleEvents.VERIFY_TOKEN, async () => {
    return await AuthRepository.verifyToken();
  }),

  validateEmail: createAction(ModuleEvents.GET_VALIDATE_EMAIL, async (params) => {
    return await AuthRepository.onVerifyEmail(params);
  }, { loading: true, errorMessage: 'Error occured while signing up. Please try again.' }),

  getSystemCurrency: createAction(ModuleEvents.GET_SYSTEM_CURRENCY, async (params) => {
    return await CommonRepository.getSystemCurrency();
  }),

  cleanVerifiedEmailData: createAction(ModuleEvents.VERIFY_TOKEN, (data) => data),

  getPromoCodeDiscount:createAction(ModuleEvents.GET_PROMO_CODE_DISCOUNT, async (params) => {
    return await CommonRepository.validatePromoCode(params);
  }),
};
