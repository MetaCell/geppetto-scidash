import TestInstancesApiService from "../../services/api/TestInstancesApiService";
import FilteringService from "../../services/FilteringService";
import Config from "../../shared/Config";
import { toggleCreateTest } from "./header";

export const FILTERING_TESTS_STARTED = "FILTERING_TESTS_STARTED";
export const FILTERING_TESTS_FINISHED = "FILTERING_TESTS_FINISHED";
export const DATE_FILTER_CHANGED = "TESTS_DATE_FILTER_CHANGED";
export const DATE_FILTER_CLEAR = "TESTS_DATE_FILTER_CLEAR";
export const TEST_CREATE_STARTED = "TEST_CREATE_STARTED";
export const TEST_CREATE_FINISHED = "TEST_CREATE_FINISHED";

export function dateFilterChanged (){
  return {
    type: DATE_FILTER_CHANGED
  };
}

export function clearDateFilter (filter, dispatch){
  return {
    type: DATE_FILTER_CLEAR,
    filter,
    dispatch
  };
}

export function filteringTestsFinished (models){
  return {
    type: FILTERING_TESTS_FINISHED,
    models
  };
}

export function filteringTestsStarted (searchText, filterName, dispatch){
  let apiService = new TestInstancesApiService();
  let filteringService = FilteringService.getInstance();

  if (searchText.length > 0) {
    filteringService.setupFilter(filterName, searchText, Config.testInstancesNamespace);
  } else {
    filteringService.deleteFilter(filterName, Config.testInstancesNamespace);
  }


  apiService.getList(false, Config.testInstancesNamespace).then(result => {
    dispatch(filteringTestsFinished(result));
  });

  return {
    type: FILTERING_TESTS_STARTED
  };
}


function testCreateFinished (result, dispatch){
  dispatch(toggleCreateTest());

  return {
    type: TEST_CREATE_FINISHED,
    result
  };
}

export function modelCreateStarted (model, dispatch){
  let apiService = new TestInstancesApiService();
  let copiedModel = Object.assign({}, model);
  copiedModel.hash_id = new Helper().generateHashId(copiedModel);

  let d = new Date();
  copiedModel.timestamp = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  let tagObjects = [];

  for (let tag of copiedModel.tags){
    tagObjects.push({
      name: tag
    });
  }

  copiedModel.tags = tagObjects;

  apiService.create(copiedModel).then(result => result.json()).then(result => {
    dispatch(testCreateFinished(result, dispatch));
  });

  return {
    type: TEST_CREATE_STARTED
  };
}
