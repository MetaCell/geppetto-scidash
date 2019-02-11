import ModelsApiService from "../../services/api/ModelsApiService";
import FilteringService from "../../services/FilteringService";
import Config from "../../shared/Config";
import Helper from "../../shared/Helper";
import { changePage } from "./header";
import PagesService from "../../services/PagesService";

export const FILTERING_MODELS_STARTED = "FILTERING_MODELS_STARTED";
export const FILTERING_MODELS_FINISHED = "FILTERING_MODELS_FINISHED";
export const DATE_FILTER_CHANGED = "MODELS_DATE_FILTER_CHANGED";
export const DATE_FILTER_CLEAR = "MODELS_DATE_FILTER_CLEAR";
export const MODEL_CREATE_STARTED = "MODEL_CREATE_STARTED";
export const MODEL_CREATE_FINISHED = "MODEL_CREATE_FINISHED";

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

export function filteringModelsFinished (models){
  return {
    type: FILTERING_MODELS_FINISHED,
    models
  };
}

export function filteringModelsStarted (searchText, filterName, dispatch){
  let apiService = new ModelsApiService();
  let filteringService = FilteringService.getInstance();

  if (searchText.length > 0) {
    filteringService.setupFilter(filterName, searchText, Config.modelInstancesNamespace);
  }
  else {
    filteringService.deleteFilter(filterName, Config.modelInstancesNamespace);
  }

  filteringService.deleteFilter("with_suites");

  apiService.getList(false, Config.modelInstancesNamespace).then(result => {

    let filters = filteringService.getFilters(Config.modelInstancesNamespace);
    let filterString = Object.keys(filters).length ? "/?" + filteringService.stringifyFilters(filters) : "/";
    window.history.pushState("", "", filterString);

    dispatch(filteringModelsFinished(result));
  });

  return {
    type: FILTERING_MODELS_STARTED
  };
}

function modelCreateFinished (result, dispatch){
  dispatch(changePage(new PagesService().MODELS_PAGE, dispatch));

  return {
    type: MODEL_CREATE_FINISHED,
    result
  };
}

export function modelCreateStarted (model, dispatch){
  let apiService = new ModelsApiService();
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
    dispatch(modelCreateFinished(result, dispatch));
  });

  return {
    type: MODEL_CREATE_STARTED
  };
}
