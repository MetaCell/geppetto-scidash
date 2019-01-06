import ScoresApiService from "../../services/api/ScoresApiService";
import FilteringService from "../../services/FilteringService";
import Config from '../../shared/Config';

export const FILTERING_TESTS_STARTED = "FILTERING_TESTS_STARTED";
export const FILTERING_TESTS_FINISHED = "FILTERING_TESTS_FINISHED";
export const DATE_FILTER_CHANGED = "INSTANCES_DATE_FILTER_CHANGED";
export const DATE_FILTER_CLEAR = "INSTANCES_DATE_FILTER_CLEAR";

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

export function filteringTestsFinished(scores){
    return {
        type: FILTERING_TESTS_FINISHED,
        scores
    };
}

export function filteringTestsStarted(searchText, filterName, dispatch){
    let apiService = new ScoreApiService();
    let filteringService = FilteringService.getInstance();

    if (searchText.length > 0)
        filteringService.setupFilter(filterName, searchText, Config.instancesNamespace);
    else
        filteringService.deleteFilter(filterName, Config.instancesNamespace);

    filteringService.deleteFilter("with_suites");

    apiService.getList(false, Config.instancesNamespace).then((result) => {

        let filters = filteringService.getFilters(Config.instancesNamespace);

        let filterString = Object.keys(filters).length ? "/?" + filteringService.stringifyFilters(filters) : "/";

        window.history.pushState("", "", filterString);
        dispatch(filteringTestsFinished(result))

    })

    return {
        type: FILTERING_TESTS_STARTED
    }
}
