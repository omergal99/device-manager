import HomeService from '../../services/HomeService';
import {
  SET_HOME_DATA,
} from '../actionTypes';

function loadHomeData() {
  return async (dispatch) => {
    const initData = await HomeService.getData();
    dispatch({ type: SET_HOME_DATA, payload: initData })
  }
}

export default {
  loadHomeData
}