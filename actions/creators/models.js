import ModelsApiService from "../../services/api/ModelsApiService";
import FilteringService from "../../services/FilteringService";
import Config from '../../shared/Config';

export const FILTERING_MODELS_STARTED = "FILTERING_MODELS_STARTED";
export const FILTERING_MODELS_FINISHED = "FILTERING_MODELS_FINISHED";
export const DATE_FILTER_CHANGED = "MODELS_DATE_FILTER_CHANGED";
export const DATE_FILTER_CLEAR = "MODELS_DATE_FILTER_CLEAR";

export function dateFilterChanged(){
    return {
        type: DATE_FILTER_CHANGED
    };
}

export function clearDateFilter(filter, dispatch){
    return {
        type: DATE_FILTER_CLEAR,
        filter,
        dispatch
    };
}

export function filteringModelsFinished(models){
    return {
        type: FILTERING_MODELS_FINISHED,
        models
    };
}

export function filteringModelsStarted(searchText, filterName, dispatch){
    let apiService = new ModelsApiService();
    let filteringService = FilteringService.getInstance();

    if (searchText.length > 0)
        filteringService.setupFilter(filterName, searchText, Config.modelInstancesNamespace);
    else
        filteringService.deleteFilter(filterName, Config.modelInstancesNamespace);

    filteringService.deleteFilter("with_suites");

    apiService.getList(false, Config.modelInstancesNamespace).then((result) => {
        dispatch(filteringModelsFinished(result))
    })

    return {
        type: FILTERING_MODELS_STARTED
    }
}

