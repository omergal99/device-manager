import HomeActions from './HomeActions';
import DeviceActions from './DeviceActions';
import RouterActions from './RouterActions';
import ServerActions from './ServerActions';

export default {
    ...HomeActions,
    ...DeviceActions,
    ...RouterActions,
    ...ServerActions,
};