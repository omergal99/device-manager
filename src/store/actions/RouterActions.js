import RouterService from '../../services/RouterService';
import {
  SET_ROUTER_DATA,
} from '../actionTypes';

function loadRouterData() {
  return async (dispatch) => {
    const initData = await RouterService.getData();
    dispatch({ type: SET_ROUTER_DATA, payload: initData })
  }
}

export default {
  loadRouterData,
}
