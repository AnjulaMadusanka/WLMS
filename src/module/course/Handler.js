import React from 'react';
import { Actions } from '../../core/modules/Actions';
import { ModuleEvents } from './Actions';
import { onToast } from '../../core/Constant';
import { navigateTo, goBack } from '../../core/services/NavigationServicd';

export default {
  [ModuleEvents.GET_COURSE_LIST]: ({ dispatch, payload, appState }) => {
    // Logger.infor(JSON.stringify(payload))
  },
  [ModuleEvents.UPDATE_COURSE_DETAILS]: ({ dispatch, payload, appState }) => {
    onToast('Course Update', payload);
    if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
      dispatch(Actions.course.getAllStateCourseList());
      navigateTo(-1)
    }
  },
  [ModuleEvents.DELETE_COURSE]: ({ dispatch, payload, appState }) => {
    onToast('Course Delete', payload);
    if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
      dispatch(Actions.course.getAllStateCourseList());
    }
  },
  [ModuleEvents.UPDATE_COURSE_STATUS]: ({ dispatch, payload, appState }) => {
    onToast('Course Status', payload);
    if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
      dispatch(Actions.course.getAllStateCourseList());
    }
  },
  [ModuleEvents.CREATE_COURSE]: ({ dispatch, payload, appState }) => {
    onToast('Course creation', payload);
    if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
      dispatch(Actions.course.getAllStateCourseList());
      navigateTo(-1)
    }
  },
  [ModuleEvents.ADD_COURSE_CONTENT]: ({ dispatch, payload, appState }) => {
    onToast('Course content creation', payload);
    if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
      dispatch(Actions.course.getCourseContent(payload.data.course_id));
    }
  },
  [ModuleEvents.UPDATE_COURSE_CONTENT]: ({ dispatch, payload, appState }) => {
    onToast('Update Course Content', payload);
    if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
      dispatch(Actions.course.getCourseContent(payload.data.course_id));
    }
  },

  [ModuleEvents.DELETE_COURSE_CONTENT]: ({ dispatch, payload, appState }) => {
    onToast('Delete Course Content', payload);
    if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
      dispatch(Actions.course.getCourseContent(payload.course_id));
    }
  },
  [ModuleEvents.SET_VIDEO_COMPLETED]: ({ dispatch, payload, appState }) => {
    if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
      onToast('Video Marked as Completed', payload);
      dispatch(Actions.course.getCousreDetails(payload?.courseId))
    }
    else {
      onToast('Video Not Updated', payload);
    }
  },

  [ModuleEvents.SET_VIDEO_AS_INCOMPLETED]: ({ dispatch, payload, appState }) => {
    if (payload && payload?.data && !payload?.data?.error && payload?.data?.status_code && payload?.data?.status_code == 1) {
      dispatch(Actions.course.getCousreDetails(payload?.params?.courseId))
    }
    onToast('Video Marked as InCompleted', payload.data);
  },

  [ModuleEvents.ADD_REVIEW_BY_STUDENT]: ({ dispatch, payload, appState }) => {
    onToast('Add Review', payload);
    if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
      dispatch(Actions.course.getCousreDetails());
    }
  },

  [ModuleEvents.UPDATE_COURSE_SECTION]: ({ dispatch, payload, appState }) => {
    onToast('Update Course Section', payload);
    if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
      dispatch(Actions.course.getCourseContent(payload.data.course_id));
    }
  },

  [ModuleEvents.ENROLL_NEW_COURSE_BY_REGISTERED_USER]: ({ dispatch, payload, appState }) => {
    onToast('Course Enrollment', payload);
    if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
      dispatch(Actions.course.getCourseContent(payload?.course_id));
      navigateTo(-1)
    }
  },

  [ModuleEvents.UPDATE_STUDENT_COURSE_STATE]: ({ dispatch, payload, appState }) => {
    const id = payload?.params?.course_id;
    dispatch(Actions.course.getAdminCourseStudentList({ type: 2, course: id, }));
    onToast('Student Status', payload, false);
  },

  [ModuleEvents.ADD_EXISTING_STUDENTS_TO_COURSE]: ({ dispatch, payload, appState }) => {
    // navigateTo('/admin-course-student-add-registered', payload?.params)
    navigateTo(-1)
    onToast('Update Course', payload?.value, false);
  }
};


