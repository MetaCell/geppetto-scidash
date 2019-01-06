import { combineReducers } from 'redux';
import scidashGlobal from './scidash-global';
import scidashHeader from './scidash-header';
import scidashScores from './scidash-scores';
import scidashTestInstances from './scidash-test-instances';
import scidashModels from './scidash-models';
import scidashUser from './scidash-user';
import scidashTestSuites from './scidash-test-suites';

const scidashApp = combineReducers({
    global: scidashGlobal,
    header: scidashHeader,
    user: scidashUser,
    scores: scidashScores,
    testSuites: scidashTestSuites,
    testInstances: scidashTestInstances,
    models: scidashModels
})

export default scidashApp
