import MobileService from '../../services/MobileService';
import {
  SET_DEVICE_DATA,
  SET_CURR_DEVICE_BY_ID,
  UPDATE_CURR_DEVICE
} from '../actionTypes';

function loadDeviceData() {
  return async (dispatch) => {
    const initData = await MobileService.getData();
    dispatch({ type: SET_DEVICE_DATA, payload: initData })
  }
}

function changeCurrDeviceById(id) {
  return async (dispatch) => {
    dispatch({ type: SET_CURR_DEVICE_BY_ID, payload: id })
  }
}

function updateCurrDevice(updatedDevice) {
  return async (dispatch) => {
    dispatch({ type: UPDATE_CURR_DEVICE, payload: updatedDevice })
  }
}

export default {
  loadDeviceData,
  changeCurrDeviceById,
  updateCurrDevice,
}
