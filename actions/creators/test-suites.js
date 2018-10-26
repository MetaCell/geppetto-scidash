import ScoreApiService from "../../services/api/ScoreApiService";

export const FILTERING_SUITES_STARTED = "FILTERING_SUITES_STARTED";
export const FILTERING_SUITES_FINISHED = "FILTERING_SUITES_FINISHED";
export const HIDE_MODEL = "HIDE_MODEL";
export const SHOW_ALL_MODELS = "SHOW_ALL_MODELS";

export function filteringSuitesFinished(scores){
    return {
        type: FILTERING_SUITES_FINISHED,
        scores
    };
}

export function filteringSuitesStarted(searchText, filterName, dispatch){
    let service = new ScoreApiService();

    if (searchText.length > 0)
        service.setupFilter(filterName, searchText);
    else
        service.deleteFilter(filterName);

    service.getList({
        with_suites: true
    }).then((result) => {

        let filters = service.getFilters();
        let filterString = Object.keys(filters).length ? "/?" + service.stringifyFilters(service.getFilters()) : "/";

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
