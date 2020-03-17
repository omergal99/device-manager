import {
  SET_DEVICE_DATA,
  SET_CURR_DEVICE_BY_ID,
  UPDATE_CURR_DEVICE,
} from '../actionTypes';

const initialState = null;

export default (state = initialState, action) => {
  // let copy = makeDeepCopy(state);
  let copy = { ...state };
  switch (action.type) {
    case SET_DEVICE_DATA:
      return action.payload;
    case SET_CURR_DEVICE_BY_ID:
      console.log('set curr');
      copy.list = copy.list.map(dev => copy.currDevice && dev._id === copy.currDevice._id ? copy.currDevice : dev);
      const deviceById = copy.list.find(dev => dev._id === action.payload);
      copy.currDevice = deviceById;
      return copy;
    case UPDATE_CURR_DEVICE:
      console.log('update');
      copy.currDevice = action.payload;
      return copy;
    default:
      return state;
  }
}

// function makeDeepCopy(state) {
//   return JSON.parse(JSON.stringify(state));
// }