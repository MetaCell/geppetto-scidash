import { combineReducers } from 'redux';
import scidashGlobal from './scidash-global';
import scidashHeader from './scidash-header';
import scidashScores from './scidash-scores';
import scidashUser from './scidash-user';
import scidashTestSuites from './scidash-test-suites';

const scidashApp = combineReducers({
    global: scidashGlobal,
    header: scidashHeader,
    scores: scidashScores,
    user: scidashUser,
    testSuites: scidashTestSuites
})

export default scidashApp
