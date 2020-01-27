import TestInstancesApiService from "../../services/api/TestInstancesApiService";
import FilteringService from "../../services/FilteringService";
import Config from "../../shared/Config";
import { changePage, changePageWithParams } from "./header";
import Helper from "../../shared/Helper";
import PagesService from "../../services/PagesService";
import { error, clearErrors } from "./global";
import TestCloneApiService from "../../services/api/TestCloneApiService";
import TestInstance from "../../models/TestInstance";

export const FILTERING_TESTS_STARTED = "FILTERING_TESTS_STARTED";
export const FILTERING_TESTS_FINISHED = "FILTERING_TESTS_FINISHED";
export const DATE_FILTER_CHANGED = "TESTS_DATE_FILTER_CHANGED";
export const DATE_FILTER_CLEAR = "TESTS_DATE_FILTER_CLEAR";
export const TEST_CREATE_STARTED = "TEST_CREATE_STARTED";
export const TEST_CREATE_FINISHED = "TEST_CREATE_FINISHED";
export const TEST_CLONE_STARTED = "TEST_CLONE_STARTED";
export const TEST_CLONE_FINISHED = "TEST_CLONE_FINISHED";
export const TEST_EDIT_REDIRECT = "TEST_EDIT_REDIRECT";
export const TEST_EDIT_STARTED = "TEST_EDIT_STARTED";
export const TEST_EDIT_FINISHED = "TEST_EDIT_FINISHED";

export function dateFilterChanged (){
  return { type: DATE_FILTER_CHANGED };
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
    let filters = filteringService.getFilters(Config.testInstancesNamespace);
    let filterString = Object.keys(filters).length ? "?" + filteringService.stringifyFilters(filters) : "";
    window.history.pushState("", "", `${location.pathname}` + filterString);

    let uniqueResults = [];
    result.map((item, index) => {
      let flag = true;
      for (let j = 0; j < uniqueResults.length; j++) {
        if (item.id === uniqueResults[j].id) {
          flag = false;
        }
      }
      if (flag) {
        uniqueResults.push(item);
      }
    }
    );

    dispatch(filteringTestsFinished(uniqueResults));
  });

  return { type: FILTERING_TESTS_STARTED };
}


function testCreateFinished (result, dispatch){
  dispatch(changePage(new PagesService().TESTS_PAGE, dispatch));

  return {
    type: TEST_CREATE_FINISHED,
    result
  };
}

export function testCreateStarted (model, dispatch){
  dispatch(clearErrors());

  let apiService = new TestInstancesApiService();
  let copiedModel = Object.assign({}, model);
  copiedModel.hash_id = new Helper().generateHashId(copiedModel);

  let d = new Date();
  copiedModel.timestamp
    = d.getFullYear()
    + "-"
    + ("0" + (d.getMonth() + 1)).slice(-2)
    + "-"
    + ("0" + d.getDate()).slice(-2)
    + "T"
    + d.getHours()
    + ":"
    + d.getMinutes();
  let tagObjects = [];

  for (let tag of copiedModel.tags){
    tagObjects.push({ name: tag });
  }

  copiedModel.tags = tagObjects;
  let responseCode = 0;

  apiService.create(copiedModel).then(result => {

    responseCode = result.status;

    result.json().then(result => {
      if (Config.errorStatuses.includes(responseCode)) {
        dispatch(error("Backend error: " + JSON.stringify(result)));
      } else {
        dispatch(testCreateFinished(result, dispatch));
      }
    });
  });

  return { type: TEST_CREATE_STARTED };

}

export function cloneTestFinished (model){
  return {
    type: TEST_CLONE_FINISHED,
    model
  };

}

export function cloneTest (testId, dispatch){
  let apiService = new TestCloneApiService().setId(testId);

  apiService.getList(false, Config.testInstancesNamespace)
    .then(result => {
      dispatch(cloneTestFinished(new TestInstance(result)));
    });

  return { type: TEST_CLONE_STARTED };

}

export function startEditTest (testId, dispatch){
  let filteringS = FilteringService.getInstance();
  let apiService = new TestInstancesApiService();
  let namespace = Config.testInstancesNamespace;

  let keys = Object.keys(filteringS.getFilters(namespace, true)).filter(key => !Config.cachableFilters.includes(key));

  apiService.getInstanceId(testId, keys, namespace).then(result => {
    let _tags = result.tags;
    result.tags = [];
    _tags.map((tag, i) => result.tags.push(tag.name));
    dispatch(changePageWithParams(new PagesService().TESTS_EDIT_PAGE, { "test": result }, dispatch));
  });

  return { type: TEST_EDIT_REDIRECT };
}

export function editTest (test, dispatch){
  let apiService = new TestInstancesApiService().setId(test.id);

  let d = new Date();
  test.timestamp = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  let tagObjects = [];

  for (let tag of test.tags){
    tagObjects.push({ name: tag });
  }

  test.tags = tagObjects;
  test.test_class.class_name = test.test_class.class_name.split(" ")[0];

  apiService.update(test).then(result => result.json()).then(result => {
    dispatch(editTestFinished(result, dispatch));
  });

  return { type: TEST_EDIT_STARTED };

}

export function editTestFinished (result, dispatch){
  dispatch(changePage(new PagesService().TESTS_PAGE, dispatch));

  return {
    type: TEST_EDIT_FINISHED,
    result
  };
}