import React from 'react';
import { Actions } from '../../core/modules/Actions';
import { ModuleEvents } from './Actions';
import _ from "lodash";
import { appHistory } from '../../core/modules/StoreCreator';
import { navigateTo } from '../../core/services/NavigationServicd';
import { USER_ROLE, onToast } from '../../core/Constant';
import Swal from 'sweetalert2'

export default {
 
};


const onAddminLoading = ({ dispatch, payload, appState }) => {
  navigateTo('/admin-dashboard')
}


const onStudentnLoading = ({ dispatch, payload, appState }) => {
  navigateTo('/dashboard')
}