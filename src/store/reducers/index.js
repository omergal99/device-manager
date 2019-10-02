import HomeStore from './HomeStore';
import DeviceStore from './DeviceStore';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    homeStore: HomeStore,
    deviceStore: DeviceStore,
});

export default rootReducer;