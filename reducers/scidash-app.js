import { combineReducers } from 'redux';
import scidashGlobal from './scidash-global';
import scidashHeader from './scidash-header';
import scidashUser from './scidash-user';
import scidashTestInstances from './scidash-test-instances';
import scidashTestSuites from './scidash-test-suites';

const scidashApp = combineReducers({
    global: scidashGlobal,
    header: scidashHeader,
    user: scidashUser,
    testInstances: scidashTestInstances,
    testSuites: scidashTestSuites
})

export default scidashApp
