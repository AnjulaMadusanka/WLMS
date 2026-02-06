import { param } from 'jquery';
import { createAction } from '../../core/AppUtils';
import { CourseRepository, CommonRepository, AdminCourseRepository, AdminStudentRepository } from '../../core/repository';

export const ModuleEvents = {
  GET_COURSE_CATALOG: "GET_COURSE_CATALOG",
  GET_COURSE_DETAILS: "GET_COURSE_DETAILS",
  GET_COURSE_LIST: "GET_COURSE_LIST",
  GET_STD_COURSE_LIST: "GET_STD_COURSE_LIST",
  GET_COURSE_MAIN_DETAILS: "GET_COURSE_MAIN_DETAILS",
  SET_VIDEO_COMPLETED: "SET_VIDEO_COMPLETED",
  UPDATE_COURSE_DETAILS: "UPDATE_COURSE_DETAILS",
  ADD_COURSE_CONTENT: "ADD_COURSE_CONTENT",
  UPDATE_COURSE_CONTENT: "UPDATE_COURSE_CONTENT",
  DELETE_COURSE: "DELETE_COURSE",
  CREATE_COURSE: "CREATE_COURSE",
  UPDATE_COURSE_STATUS: "UPDATE_COURSE_STATUS",
  GET_ALL_STATUS_COURSE_LIST: "GET_ALL_STATUS_COURSE_LIST",
  GET_COURSE_CONTENT: 'GET_COURSE_CONTENT',
  GET_COURSE_QUIZ_LIST: 'GET_COURSE_QUIZ_LIST',
  DELETE_COURSE_CONTENT: 'DELETE_COURSE_CONTENT',
  ADD_REVIEW_BY_STUDENT: 'ADD_REVIEW_BY_STUDENT',
  ADD_STUDENT_REVIEW_STATUS: 'ADD_STUDENT_REVIEW_STATUS',
  UPDATE_COURSE_SECTION: "UPDATE_COURSE_SECTION",
  ENROLL_NEW_COURSE_BY_REGISTERED_USER: "ENROLL_NEW_COURSE_BY_REGISTERED_USER",
  GET_SYSTEM_PARAMS: 'GET_SYSTEM_PARAMS',
  CLEAR_STORE: 'CLEAR_STORE',
  GET_COURSE_STUDENT_LIST_BY_ADMIN: "GET_COURSE_STUDENT_LIST_BY_ADMIN",
  UPDATE_STUDENT_COURSE_STATE: "UPDATE_STUDENT_COURSE_STATE",
  GET_SIGNED_URL: "GET_SIGNED_URL",
  GET_STUDENT_LIST_NOT_REGISTERED_IN_A_COURSE: "GET_STUDENT_LIST_NOT_REGISTERED_IN_A_COURSE",
  ADD_EXISTING_STUDENTS_TO_COURSE: "ADD_EXISTING_STUDENTS_TO_COURSE",
  GET_COURSE_CURRENCIES:"GET_COURSE_CURRENCIES",
  SET_VIDEO_AS_INCOMPLETED: "SET_VIDEO_AS_INCOMPLETED"
};

export default {
  getCousreCatalog: createAction(ModuleEvents.GET_COURSE_CATALOG, async (params) => {
    return await CourseRepository.getCousreCatalog();
  }),
  getCousreDetails: createAction(ModuleEvents.GET_COURSE_DETAILS, async (params) => {
    return await CourseRepository.getCousreDetails(params);
  }),

  getCourseList: createAction(ModuleEvents.GET_COURSE_LIST, async () => {
    return await CommonRepository.courseList();
  }),

  getStdCourseList: createAction(ModuleEvents.GET_STD_COURSE_LIST, async () => {
    return await CommonRepository.stdcourseList();
  }),

  getCourseMainDetails: createAction(ModuleEvents.GET_COURSE_MAIN_DETAILS, async (params) => {
    return await AdminCourseRepository.fetchMainDetails(params);
  }),

  updateCourseMainDetails: createAction(ModuleEvents.UPDATE_COURSE_DETAILS, async (params) => {
    return await AdminCourseRepository.adminCourseUpdate(params);
  }),

  createCourse: createAction(ModuleEvents.CREATE_COURSE, async (params) => {
    return await AdminCourseRepository.adminCourseCreate(params);
  }),

  updateCourseStatus: createAction(ModuleEvents.UPDATE_COURSE_STATUS, async (params) => {
    const data = await AdminCourseRepository.adminCourseStatusUpdate(params);
    return { ...data, params }
  }),

  deleteCourse: createAction(ModuleEvents.DELETE_COURSE, async (params) => {
    const data = await AdminCourseRepository.adminCourseDelete(params);
    return { ...data, params }
  }),

  getAllStateCourseList: createAction(ModuleEvents.GET_ALL_STATUS_COURSE_LIST, async () => {
    const data = await AdminCourseRepository.allStateCourseList();
    return { ...data }
  }),

  registerNewCourseByUser: createAction(ModuleEvents.ENROLL_NEW_COURSE_BY_REGISTERED_USER, async (params) => {
    const data = await CourseRepository.onEnrollNewCourse(params);
    return { ...data, course_id: params?.course_id }
  }, { loading: true, errorMessage: 'Error occured while enrolling. Please try again.' }),

  getCourseContent: createAction(ModuleEvents.GET_COURSE_CONTENT, async (params) => {
    const data = await AdminCourseRepository.getCourseContent(params);
    return { ...data, params }
  }),

  createCourseContent: createAction(ModuleEvents.ADD_COURSE_CONTENT, async (params) => {
    return await AdminCourseRepository.adminCourseContentCreate(params);
  }),

  updateCourseContent: createAction(ModuleEvents.UPDATE_COURSE_CONTENT, async (params) => {
    return await AdminCourseRepository.updateCourseContent(params);
  }),

  setVideoCompleted: createAction(ModuleEvents.SET_VIDEO_COMPLETED, async (params) => {
    const data = await CourseRepository.setVideoCompleted(params);
    return { ...data,courseId:params?.courseId }
  }),

  setVideosInCompleted: createAction(ModuleEvents.SET_VIDEO_AS_INCOMPLETED, async (params) => {
    const data = await CourseRepository.onVideosMarkAsInCompleted(params?.list);
    return {data, params}
  }),


  getCourseQuizList: createAction(ModuleEvents.GET_COURSE_QUIZ_LIST, async (params) => {
    return await AdminCourseRepository.getCourseQuizList(params);
  }),

  deleteCourseContent: createAction(ModuleEvents.DELETE_COURSE_CONTENT, async (course_content_id, course_id) => {
    const data = await AdminCourseRepository.adminCourseContentDelete(course_content_id);
    return { ...data, course_id }
  }),

  AddReviewByStudent: createAction(ModuleEvents.ADD_REVIEW_BY_STUDENT, async (params) => {
    return await CourseRepository.addReviewByStudent(params);
  }),

  AddReviewStudentStatus: createAction(ModuleEvents.ADD_STUDENT_REVIEW_STATUS, async (params) => {
    return await CourseRepository.addReviewStatus(params);
  }),

  updateCourseSectionName: createAction(ModuleEvents.UPDATE_COURSE_SECTION, async (params) => {
    const data = await AdminCourseRepository.updateCourseSectionName(params);
    return { ...data }
  }),

  getSystemParameters: createAction(ModuleEvents.GET_SYSTEM_PARAMS, async (params) => {
    return await CommonRepository.getSystemParams(params);
  }),

  getAdminCourseStudentList: createAction(ModuleEvents.GET_COURSE_STUDENT_LIST_BY_ADMIN, async (params) => {
    const data = await AdminCourseRepository.getCourseStuendList(params);
    return { ...data, params }
  }),

  updateStudentCourseStatus: createAction(ModuleEvents.UPDATE_STUDENT_COURSE_STATE, async (params) => {
    const data = await AdminStudentRepository.updateCourseStudentStatus(params);
    return { ...data, params }
  }),
  clearStore: createAction(ModuleEvents.CLEAR_STORE, async (params) => {
    // return await CommonRepository.getSystemParams(params);
  }),
  getSignedUrl: createAction(ModuleEvents.GET_SIGNED_URL, async (params) => {
    return await CourseRepository.getSignedUrl(params);
  }),

  getStudentListNotRegisteredInACourse: createAction(ModuleEvents.GET_STUDENT_LIST_NOT_REGISTERED_IN_A_COURSE, async (courseId) => {
    return await AdminStudentRepository.getAdminUsersNotRegisteredInCourse(courseId);
  }),

  addExistingStudentsToACourse: createAction(ModuleEvents.ADD_EXISTING_STUDENTS_TO_COURSE, async (data,params) => {
    const value = await AdminStudentRepository.addExistingStudentsToACourse(data);
    return {value,params}
  }),

  getCourseCurrencies: createAction(ModuleEvents.GET_COURSE_CURRENCIES, async (courseId) => {
    return await CourseRepository.getCourseCurrencies(courseId);
  }),

  

};
