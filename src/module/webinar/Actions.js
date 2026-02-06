import { createAction } from '../../core/AppUtils';
import { AdminDashboardRepository, AdminWebinarRepository , WebinarRepository} from '../../core/repository';



export const ModuleEvents = {
  GET_WEBINAR_LIST: "GET_WEBINAR_LIST",
  GET_WEBINAR_LIST_ADMIN: 'GET_WEBINAR_LIST_ADMIN',
  CREATE_WEBINAR_ADMIN:'CREATE_WEBINAR_ADMIN',
  UPDATE_WEBINAR_STATUS_ADMIN:'UPDATE_WEBINAR_STATUS_ADMIN',
  UPDATE_WEBINAR_ADMIN:'UPDATE_WEBINAR_ADMIN',
  GET_WEBINAR_DETAILS_BY_ID_ADMIN:'GET_WEBINAR_DETAILS_BY_ID_ADMIN',
  DELETE_WEBINAR_ADMIN:'DELETE_WEBINAR_ADMIN',
  COMPLETE_WEBINAR_ADMIN:'COMPLETE_WEBINAR_ADMIN',
  ADD_COURSE_TO_WEBINAR:"ADD_COURSE_TO_WEBINAR"
};

export default {
  getWebinar:createAction(ModuleEvents.GET_WEBINAR_LIST, async (params) => {
    return await WebinarRepository.getWebinar(params)
  }),

  getAllWebinarsAdmin:createAction(ModuleEvents.GET_WEBINAR_LIST_ADMIN, async () => {
    return await AdminWebinarRepository.getAdminWebinarList()
  }),

  getWebinarDetailsByIdAdmin:createAction(ModuleEvents.GET_WEBINAR_DETAILS_BY_ID_ADMIN, async (params) => {
    return await AdminWebinarRepository.getAdminWebinarById(params)
  }),

  updateWebinarAdmin:createAction(ModuleEvents.UPDATE_WEBINAR_ADMIN, async (params) => {
    return await AdminWebinarRepository.updateAdminWebinar(params)
  }),

  updateWebinarAdminStatus:createAction(ModuleEvents.UPDATE_WEBINAR_STATUS_ADMIN, async (params) => {
    return await AdminWebinarRepository.updateAdminWebinarStatus(params)
  }),

  createWebinarAdmin:createAction(ModuleEvents.CREATE_WEBINAR_ADMIN, async (params) => {
    return await AdminWebinarRepository.createWebinar(params)
  }),

 deleteWebinarAdmin:createAction(ModuleEvents.DELETE_WEBINAR_ADMIN, async (params) => {
    return await AdminWebinarRepository.deleteAdminWebinar(params)
  }),

  updateWebinarCompleteAdmin:createAction(ModuleEvents.COMPLETE_WEBINAR_ADMIN, async (params) => {
    return await AdminWebinarRepository.updateAdminWebinarComplete(params)
  }),

  addCourseToWebinar:createAction(ModuleEvents.ADD_COURSE_TO_WEBINAR, async (params) => {
    return await AdminWebinarRepository.addCourseToWebinar(params)
  }),
};