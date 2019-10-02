import {
  SET_HOME_DATA,
} from '../actionTypes';

const initialState = null;

export default (state = initialState, action) => {
  // var copy = makeDeepCopy(state);
  switch (action.type) {
    case SET_HOME_DATA:
      return action.payload;
    default:
      return state;
  }
}

// function makeDeepCopy(state) {
//   return JSON.parse(JSON.stringify(state));
// }