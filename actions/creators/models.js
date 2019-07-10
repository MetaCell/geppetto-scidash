import ModelsApiService from "../../services/api/ModelsApiService";
import FilteringService from "../../services/FilteringService";
import Config from "../../shared/Config";
import Helper from "../../shared/Helper";
import { changePage, changePageWithParams } from "./header";
import PagesService from "../../services/PagesService";
import ModelInstance from "../../models/ModelInstance";
import ModelCloneApiService from "../../services/api/ModelCloneApiService";

export const FILTERING_MODELS_STARTED = "FILTERING_MODELS_STARTED";
export const FILTERING_MODELS_FINISHED = "FILTERING_MODELS_FINISHED";
export const DATE_FILTER_CHANGED = "MODELS_DATE_FILTER_CHANGED";
export const DATE_FILTER_CLEAR = "MODELS_DATE_FILTER_CLEAR";
export const MODEL_CREATE_STARTED = "MODEL_CREATE_STARTED";
export const MODEL_CREATE_FINISHED = "MODEL_CREATE_FINISHED";
export const MODEL_CLONE_STARTED = "MODEL_CLONE_STARTED";
export const MODEL_CLONE_FINISHED = "MODEL_CLONE_FINISHED";
export const MODEL_EDIT_REDIRECT = "MODEL_EDIT_REDIRECT";
export const MODEL_EDIT_STARTED = "MODEL_EDIT_STARTED";
export const MODEL_EDIT_FINISHED = "MODEL_EDIT_FINISHED";

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
    let filterString = Object.keys(filters).length ? "?" + filteringService.stringifyFilters(filters) : "";
    window.history.pushState("", "", `${location.pathname}` + filterString);

    let uniqueResults = [];
    result.map((item, index) =>
    {
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

    dispatch(filteringModelsFinished(uniqueResults));
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

export function cloneModelFinished (model){
  return {
    type: MODEL_CLONE_FINISHED,
    model
  };

}

export function cloneModel (testId, dispatch){
  let apiService = new ModelCloneApiService().setId(testId);

  apiService.getList(false, Config.modelInstancesNamespace)
    .then(result => {
      dispatch(cloneModelFinished(new ModelInstance(result)));
    });

  return {
    type: MODEL_CLONE_STARTED
  };

}

export function startEditModel (modelId, dispatch){
  let filteringS = FilteringService.getInstance();
  let apiService = new ModelsApiService();
  let namespace = Config.modelInstancesNamespace;

  let keys = Object.keys(filteringS.getFilters(namespace, true)).filter(key => !Config.cachableFilters.includes(key));

  apiService.getInstanceId(modelId, keys, namespace).then(result => {
    let _tags = result.tags;
    result.tags = [];
    _tags.map((tag, i) => result.tags.push(tag.name));
    dispatch(changePageWithParams(new PagesService().MODELS_EDIT_PAGE, { "model": result }, dispatch));
  });

  return {
    type: MODEL_EDIT_REDIRECT
  };
}

export function editModel (model, dispatch){
  let apiService = new ModelsApiService().setId(model.id);

  let d = new Date();
  model.timestamp = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  let tagObjects = [];

  for (let tag of model.tags){
    tagObjects.push({
      name: tag
    });
  }

  model.tags = tagObjects;

  apiService.update(model).then(result => result.json()).then(result => {
    dispatch(editModelFinished(result, dispatch));
  });

  return {
    type: MODEL_EDIT_STARTED
  };

}

export function editModelFinished (result, dispatch){
  dispatch(changePage(new PagesService().MODELS_PAGE, dispatch));

  return {
    type: MODEL_EDIT_FINISHED,
    result
  };
}