import { createAction } from '../../core/AppUtils';
import { AdminStudentRepository, CommonRepository } from '../../core/repository';

export const ModuleEvents = {
  GET_ADMIN_STUDENT_LIST: 'GET_ADMIN_STUDENT_LIST',
  CREATE_ADMIN_STUDENT: "CREATE_ADMIN_STUDENT",
  CREATE_ADMIN_STUDENT_BY_COURSE: "CREATE_ADMIN_STUDENT_BY_COURSE",
  UPDATE_STUDENT_STATUS: "UPDATE_STUDENT_STATUS",
  GET_COURSE_LIST:"GET_COURSE_LIST",
  GET_STUDENT_PROGRESS:"GET_STUDENT_PROGRESS",
  GET_STUDENT_ATTEMPTDETAILS:"GET_STUDENT_ATTEMPTDETAILS",
  GET_ADMIN_STUDENT_COURSEDETAILS:"GET_ADMIN_STUDENT_COURSEDETAILS"
};

export default {

  getAdminUserDetails: createAction(ModuleEvents.GET_ADMIN_STUDENT_LIST, async (params) => {
    const data = await AdminStudentRepository.getAdminUsersList(params);
    return { ...data, params }
  }),

  createAdminStudent: createAction(ModuleEvents.CREATE_ADMIN_STUDENT, async (params) => {
    const data = await AdminStudentRepository.createAdminStudent(params);
    return { ...data, params }
  }),

  createAdminNewStudent: createAction(ModuleEvents.CREATE_ADMIN_STUDENT_BY_COURSE, async (params) => {
    const data = await AdminStudentRepository.createAdminStudent(params);
    return { ...data, params }
  }),

  updateStudentStatus: createAction(ModuleEvents.UPDATE_STUDENT_STATUS, async (params) => {
    const data = await AdminStudentRepository.updateStudentStatus(params);
    return { ...data, params }
  }),

  getCourseList: createAction(ModuleEvents.GET_COURSE_LIST, async () => {
    const data = await CommonRepository.courseList();
    return { ...data }
  }),

  getStudentProgress: createAction(ModuleEvents.GET_STUDENT_PROGRESS, async (params) => {
    const data = await AdminStudentRepository.getStudentProgress(params);
    return { ...data }
  }),

  getStudentAttemptDetails:createAction(ModuleEvents.GET_STUDENT_ATTEMPTDETAILS, async (params) => {
    const data = await AdminStudentRepository.getStudentAttemptDetails(params);
    return { ...data }
  }),

  getAdminCourseDetails:createAction(ModuleEvents.GET_ADMIN_STUDENT_COURSEDETAILS, async (params) => {
    const data = await AdminStudentRepository.getAdminCourseDetails(params);
    return { ...data }
  }),
};
