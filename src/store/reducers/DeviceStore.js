import {
  SET_DEVICE_DATA,
  UPDATE_CURRDEVICE_BY_ID
} from '../actionTypes';

const initialState = null;

export default (state = initialState, action) => {
  var copy = makeDeepCopy(state);
  switch (action.type) {
    case SET_DEVICE_DATA:
      return action.payload;
    case UPDATE_CURRDEVICE_BY_ID:
      const deviceById = copy.list.find(dev => dev._id === action.payload);
      copy.currDevice = deviceById;
      return copy;
    default:
      return state;
  }
}

function makeDeepCopy(state) {
  return JSON.parse(JSON.stringify(state));
}