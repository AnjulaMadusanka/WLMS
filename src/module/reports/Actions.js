import {createAction} from '../../core/AppUtils';
import {AdminReportRepository} from '../../core/repository';

export const ModuleEvents = {
  LOADING_STARTED: 'LOADING_STARTED',
  LOADING_FINISHED: 'LOADING_FINISHED',
  NETWORK_ERROR:'NETWORK_ERROR',
  STUDENT_REPORT_DATA: 'STUDENT_REPORT_DATA',
  PAYMENT_REPORT_DATA: 'PAYMENT_REPORT_DATA',
};

export default {
  networkError: createAction(ModuleEvents.NETWORK_ERROR, error => error),
  loadingStarted: createAction(ModuleEvents.LOADING_STARTED, action => action),
  loadingFinished: createAction(ModuleEvents.LOADING_FINISHED, action => action),

  getAdminStudentReport: createAction(ModuleEvents.STUDENT_REPORT_DATA, async (params) => {
    const data = await AdminReportRepository.getStudentReportData(params);
    return { ...data, params }
  }),

  getAdminPaymentReport: createAction(ModuleEvents.PAYMENT_REPORT_DATA, async (params) => {
    const data = await AdminReportRepository.getPaymentReportData(params);
    return { ...data, params }
  }),
};
