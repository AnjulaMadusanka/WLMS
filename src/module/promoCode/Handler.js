import React from 'react';
import { Actions } from '../../core/modules/Actions';
import { ModuleEvents } from './Actions';
import { USER_ROLE, onToast } from '../../core/Constant';
import { navigateTo } from '../../core/services/NavigationServicd';

export default{
    // [ModuleEvents.SEND_MESSAGE]: ({ dispatch, payload, appState }) => {
    //     if (payload && !payload.error && payload.status && payload.status_code == 1) {
    //       let userId = localStorage.getItem('userId');
    //       const userType = localStorage.getItem('userType');
    //       if (userType == USER_ROLE.admin) {
    //        userId = localStorage.getItem('adminChatUserId');
    //       }
    //       dispatch(Actions.message.getChatRoomData(userId));
    //     } else {
    //       onToast('Send Message', payload, false)
    //     }
    
    //   },
    [ModuleEvents.CREATE_PROMO]: ({ dispatch, payload, appState }) => {
      onToast('Promo Code Created', payload);
      if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
        dispatch(Actions.promoCode.getPromoData());
      }
    },

    [ModuleEvents.UPDATE_PROMO]: ({ dispatch, payload, appState }) => {
      onToast('Promo code details updated', payload);
      if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
        dispatch(Actions.promoCode.getPromoData());
        navigateTo(-1)
      }
    },


    [ModuleEvents.UPDATE_PROMO_STATUS]: ({ dispatch, payload, appState }) => {
        onToast('Promo Code Status Updated', payload);
        if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
          dispatch(Actions.promoCode.getPromoData());
        }
      },
    
}