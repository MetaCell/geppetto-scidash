import PagesService from "../services/PagesService";
import FilteringService from "../services/FilteringService";
import Config from "../shared/Config";
import InitialStateService from "../services/InitialStateService";

export function openTestsView (state, action, type){

  let newState = {
    ...state
  };

  if (type == "header") {
    newState = {
      ...state,
      suitesActive: false,
      testsActive: true
    };
  } else if (type == "global") {
    let service = new FilteringService();
    let filters = service.getFilters(Config.scoresNamespace);
    let filterString = Object.keys(filters).length ? "/?" + service.stringifyFilters(filters) : "/";

    window.history.pushState("", "", filterString);

    newState = {
      ...state,
      dateFilterChanged: false,
      activeView: new PagesService().TESTS_VIEW
    };
  }
  return newState;
}

export function openSuitesView (state, action, type){

  let newState = {
    ...state
  };

  if (type == "header") {
    newState = {
      ...state,
      testsActive: false,
      suitesActive: true
    };
  } else if (type == "global") {
    let service = new FilteringService();
    let filters = service.getFilters(Config.suiteNamespace);
    let filterString = Object.keys(filters).length ? "/?" + service.stringifyFilters(filters) : "/";

    window.history.pushState("", "", filterString);
    newState = {
      ...state,
      dateFilterChanged: false,
      activeView: new PagesService().SUITES_VIEW
    };
  }

  return newState;
}
