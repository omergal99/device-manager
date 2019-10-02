import DeviceService from '../../services/DeviceService';
import {
  SET_DEVICE_DATA,
  UPDATE_CURRDEVICE_BY_ID,
} from '../actionTypes';

function loadDeviceData() {
  return async (dispatch) => {
    const initData = await DeviceService.getData();
    dispatch({ type: SET_DEVICE_DATA, payload: initData })
  }
}

function changeCurrDeviceById(id) {
  return async (dispatch) => {
    dispatch({ type: UPDATE_CURRDEVICE_BY_ID, payload: id })
  }
}

export default {
  loadDeviceData,
  changeCurrDeviceById
}
