import { createAction } from '../../core/AppUtils';
import {GuestRepository } from '../../core/repository';

export const ModuleEvents = {
  GET_INITIAL_COURSE_DETAILS:"GET_INITIAL_COURSE_DETAILS",
  GET_SAMPLE_CLASS:"GET_SAMPLE_CLASS",
  FREE_ORIENTATION:"FREE_ORIENTATION"
};

export default {
  getInitialCourseDetails: createAction(ModuleEvents.GET_INITIAL_COURSE_DETAILS, async (params) => {
    const data = await GuestRepository.getInitialCourseDetails(params);
    return {...data, params}
  }),

  getSampleClass: createAction(ModuleEvents.GET_SAMPLE_CLASS, async (params) => {
    const data = await GuestRepository.getSampleClass(params);
    return {...data, params}
  }),

  setFreeOrientaion:createAction(ModuleEvents.FREE_ORIENTATION, async (params) => {
    const data = await GuestRepository.freeOreinataion(params);
    return {...data, params}
  }),
};
