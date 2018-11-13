import ScoreApiService from "../../services/api/ScoreApiService";
import Config from '../../shared/Config';

export const FILTERING_SUITES_STARTED = "FILTERING_SUITES_STARTED";
export const FILTERING_SUITES_FINISHED = "FILTERING_SUITES_FINISHED";
export const HIDE_MODEL = "HIDE_MODEL";
export const SHOW_ALL_MODELS = "SHOW_ALL_MODELS";
export const DATE_FILTER_CHANGED = "SUITES_DATE_FILTER_CHANGED";
export const DATE_FILTER_CLEAR = "SUITES_DATE_FILTER_CLEAR";

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

export function filteringSuitesFinished(scores){
    return {
        type: FILTERING_SUITES_FINISHED,
        scores
    };
}

export function filteringSuitesStarted(searchText, filterName, dispatch){
    let service = new ScoreApiService();
    service.setupFilter('with_suites', true, Config.suiteNamespace);

    if (searchText.length > 0)
        service.setupFilter(filterName, searchText, Config.suiteNamespace);
    else
        service.deleteFilter(filterName, Config.suiteNamespace);

    service.getList(false, Config.suiteNamespace).then((result) => {

        let filters = service.getFilters(Config.suiteNamespace);
        let filterString = Object.keys(filters).length ? "/?" + service.stringifyFilters(filters) : "/";

        window.history.pushState("", "", filterString);
        dispatch(filteringSuitesFinished(result))

    })

    return {
        type: FILTERING_SUITES_STARTED
    }
}

export function hideModel(modelKey) {
    return {
        type: HIDE_MODEL,
        modelKey
    }
}

export function showAllModels(){
    return {
        type: SHOW_ALL_MODELS
    };
}
