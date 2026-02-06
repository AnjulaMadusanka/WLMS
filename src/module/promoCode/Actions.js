import { createAction } from "../../core/AppUtils";
import { AdminPromoRepository } from "../../core/repository";

export const ModuleEvents = {
  GET_PROMO_DATA: "GET_PROMO_DATA",
  CREATE_PROMO:"CREATE_PROMO",
  UPDATE_PROMO: "UPDATE_PROMO",
  UPDATE_PROMO_STATUS: "UPDATE_PROMO_STATUS",
};

export default {
  getPromoData: createAction(ModuleEvents.GET_PROMO_DATA, async () => {
    return await AdminPromoRepository.getAdminPromo();
  }),

  createPromoCode: createAction(ModuleEvents.CREATE_PROMO, async (params) => {
    return await AdminPromoRepository.createAdminPromo(params);
  }),

  updatePromo: createAction(ModuleEvents.UPDATE_PROMO, async (params) => {
    const data = await AdminPromoRepository.updateAdminPromo(params);
    return { ...data, params };
  }),

  updatePromoStatus: createAction(
    ModuleEvents.UPDATE_PROMO_STATUS,
    async (params) => {
      const data = await AdminPromoRepository.updatePromoStatus(params);
      return { ...data};
    }
  ),
};
