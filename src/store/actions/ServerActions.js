import ServerService from '../../services/ServerService';
import {
  SET_SERVER_DATA,
} from '../actionTypes';

function loadServerData() {
  return async (dispatch) => {
    const initData = await ServerService.getData();
    dispatch({ type: SET_SERVER_DATA, payload: initData })
  }
}

export default {
  loadServerData,
}
