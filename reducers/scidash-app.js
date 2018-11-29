import { combineReducers } from 'redux';
import scidashGlobal from './scidash-global';
import scidashHeader from './scidash-header';
import scidashTestInstances from './scidash-test-instances';
import scidashTestSuites from './scidash-test-suites';
import scidashScheduler from './scidash-scheduler';

const scidashApp = combineReducers({
    global: scidashGlobal,
    header: scidashHeader,
    testInstances: scidashTestInstances,
    testSuites: scidashTestSuites,
    scheduler: scidashScheduler
})

export default scidashApp
