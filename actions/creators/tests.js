import TestInstancesApiService from "../../services/api/TestInstancesApiService";
import FilteringService from "../../services/FilteringService";
import Config from '../../shared/Config';

export const FILTERING_TESTS_STARTED = "FILTERING_TESTS_STARTED";
export const FILTERING_TESTS_FINISHED = "FILTERING_TESTS_FINISHED";
export const DATE_FILTER_CHANGED = "TESTS_DATE_FILTER_CHANGED";
export const DATE_FILTER_CLEAR = "TESTS_DATE_FILTER_CLEAR";

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

export function filteringTestsFinished(models){
    return {
        type: FILTERING_TESTS_FINISHED,
        models
    };
}

export function filteringTestsStarted(searchText, filterName, dispatch){
    let apiService = new TestInstancesApiService();
    let filteringService = FilteringService.getInstance();

    if (searchText.length > 0)
        filteringService.setupFilter(filterName, searchText, Config.testInstancesNamespace);
    else
        filteringService.deleteFilter(filterName, Config.testInstancesNamespace);

    filteringService.deleteFilter("with_suites");

    apiService.getList(false, Config.testInstancesNamespace).then((result) => {
        dispatch(filteringTestsFinished(result))
    })

    return {
        type: FILTERING_TESTS_STARTED
    }
}
