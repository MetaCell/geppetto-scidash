import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import scidashGlobal from "./scidash-global";
import scidashHeader from "./scidash-header";
import scidashScores from "./scidash-scores";
import scidashTestInstances from "./scidash-test-instances";
import scidashModels from "./scidash-models";
import scidashModelClasses from "./scidash-model-classes";
import scidashTestClasses from "./scidash-test-classes";
import scidashUser from "./scidash-user";
import scidashTestSuites from "./scidash-test-suites";
import scidashScheduler from "./scidash-scheduler";

const scidashApp = history => combineReducers({
  router: connectRouter(history),
  global: scidashGlobal,
  header: scidashHeader,
  user: scidashUser,
  scores: scidashScores,
  testSuites: scidashTestSuites,
  testInstances: scidashTestInstances,
  scheduler: scidashScheduler,
  models: scidashModels,
  modelClasses: scidashModelClasses,
  testClasses: scidashTestClasses
});

export default scidashApp;
