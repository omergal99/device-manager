import HomeActions from './HomeActions';
import MobileActions from './MobileActions';
import RouterActions from './RouterActions';
import ServerActions from './ServerActions';

export default {
    ...HomeActions,
    ...MobileActions,
    ...RouterActions,
    ...ServerActions,
};