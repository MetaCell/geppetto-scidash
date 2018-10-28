import ScoreApiService from "../../services/api/ScoreApiService";

export const FILTERING_TESTS_STARTED = "FILTERING_TESTS_STARTED";
export const FILTERING_TESTS_FINISHED = "FILTERING_TESTS_FINISHED";

export function filteringTestsFinished(scores){
    return {
        type: FILTERING_TESTS_FINISHED,
        scores
    };
}

export function filteringTestsStarted(searchText, filterName, dispatch){
    let service = new ScoreApiService();

    if (searchText.length > 0)
        service.setupFilter(filterName, searchText);
    else
        service.deleteFilter(filterName);

    service.getList().then((result) => {

        let filters = service.getFilters();
        let filterString = Object.keys(filters).length ? "/?" + service.stringifyFilters(service.getFilters()) : "/";

        window.history.pushState("", "", filterString);
        dispatch(filteringTestsFinished(result))

    })

    return {
        type: FILTERING_TESTS_STARTED
    }
}