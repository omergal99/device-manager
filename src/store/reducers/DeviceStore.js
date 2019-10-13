import {
  SET_DEVICE_DATA,
  SET_CURR_DEVICE_BY_ID,
  UPDATE_CURR_DEVICE,
} from '../actionTypes';

const initialState = null;

export default (state = initialState, action) => {
  var copy = makeDeepCopy(state);
  switch (action.type) {
    case SET_DEVICE_DATA:
      return action.payload;
    case SET_CURR_DEVICE_BY_ID:
      copy.list = copy.list.map(dev => copy.currDevice && dev._id === copy.currDevice._id ? copy.currDevice : dev);
      const deviceById = copy.list.find(dev => dev._id === action.payload);
      copy.currDevice = deviceById;
      return copy;
    case UPDATE_CURR_DEVICE:
      copy.currDevice = action.payload;
      return copy;
    default:
      return state;
  }
}

function makeDeepCopy(state) {
  return JSON.parse(JSON.stringify(state));
}