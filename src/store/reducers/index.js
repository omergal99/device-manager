import HomeStore from './HomeStore';
import DeviceStore from './DeviceStore';
import RouterStore from './RouterStore';
import ServerStore from './ServerStore';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    homeStore: HomeStore,
    deviceStore: DeviceStore,
    routerStore: RouterStore,
    serverStore: ServerStore,
});

export default rootReducer;