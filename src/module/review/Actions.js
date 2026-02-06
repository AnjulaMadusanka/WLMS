import { createAction } from '../../core/AppUtils';
import { AdminReviewRepository } from '../../core/repository';

export const ModuleEvents = {
  LOADING_STARTED: 'LOADING_STARTED',
  LOADING_FINISHED: 'LOADING_FINISHED',
  NETWORK_ERROR: 'NETWORK_ERROR',
  GET_REVIEW_LIST_ADMIN: 'GET_REVIEW_LIST_ADMIN',
  ADD_STUDENT_REVIEW_BY_ADMIN: 'ADD_STUDENT_REVIEW_BY_ADMIN',
  GET_NON_APPROVED_REVIEW_LIST_ADMIN: 'GET_NON_APPROVED_REVIEW_LIST_ADMIN',
  APPROVE_REVIEW_ADMIN: 'APPROVE_REVIEW_ADMIN',
  DELETE_ADMIN_REVIEW: 'DELETE_ADMIN_REVIEW'
};

export default {

  getAdminReviewList: createAction(ModuleEvents.GET_REVIEW_LIST_ADMIN, async (params) => {
    const data = await AdminReviewRepository.getReviewListAdmin(params);
    return { ...data }
  }),

  addStudentReviewByAdmin: createAction(ModuleEvents.ADD_STUDENT_REVIEW_BY_ADMIN, async (params) => {
    const data = await AdminReviewRepository.addStudentReviewByAdmin(params);
    return { ...data }
  }),

  approveReviewAdmin: createAction(ModuleEvents.APPROVE_REVIEW_ADMIN, async (params) => {
    const data = await AdminReviewRepository.approveReviewAdmin(params);
    return { ...data }
  }),

  getNonApprovedReviewsAdmin: createAction(ModuleEvents.GET_NON_APPROVED_REVIEW_LIST_ADMIN, async (params) => {
    const data = await AdminReviewRepository.getNonApprovedReviewListAdmin(params);
    return { ...data }
  }),

  deleteAdminReview: createAction(ModuleEvents.DELETE_ADMIN_REVIEW, async (id, courseId) => {
    const data = await AdminReviewRepository.deleteReviewAdmin(id);
    return { ...data, courseId }
  }),

  networkError: createAction(ModuleEvents.NETWORK_ERROR, error => error),
  loadingStarted: createAction(ModuleEvents.LOADING_STARTED, action => action),
  loadingFinished: createAction(ModuleEvents.LOADING_FINISHED, action => action),
};
