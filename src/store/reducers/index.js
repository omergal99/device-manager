import HomeStore from './HomeStore';
import MobileStore from './MobileStore';
import RouterStore from './RouterStore';
import ServerStore from './ServerStore';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    homeStore: HomeStore,
    mobileStore: MobileStore,
    routerStore: RouterStore,
    serverStore: ServerStore,
});

export default rootReducer;