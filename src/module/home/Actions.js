import { createAction } from '../../core/AppUtils';
import { AdminDashboardRepository } from '../../core/repository';
import UserDashboardRepository from '../../core/repository/UserDashboardRepository';

export const ModuleEvents = {
  GET_ADMIN_DASHBOARD_DATA: "GET_ADMIN_DASHBOARD_DATA",
  GET_FORUM_DATA:"GET_FORUM_DATA",
  GET_COURSE_PROGRESS:"GET_COURSE_PROGRESS",
  GET_LIVE_WEBINAR:"GET_LIVE_WEBINAR"
};

export default {
  getAdminDashboardData:createAction(ModuleEvents.GET_ADMIN_DASHBOARD_DATA, async () => {
    return await AdminDashboardRepository.adminDashboard()
  }),

  userDashboard:createAction(ModuleEvents.GET_FORUM_DATA, async (params) => {
    return await UserDashboardRepository.userDashboard(params)
  }),

  getcourseProgress:createAction(ModuleEvents.GET_COURSE_PROGRESS, async (params) => {
    return await UserDashboardRepository.courseProgress()
  }),

  getLiveWebinar:createAction(ModuleEvents.GET_LIVE_WEBINAR, async (params) => {
    return await UserDashboardRepository.liveWebinar()
  }),


};
