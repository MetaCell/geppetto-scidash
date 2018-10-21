import ScoreApiService from "../../services/api/ScoreApiService";

export const FILTERING_SUITES_STARTED = "FILTERING_SUITES_STARTED";
export const FILTERING_SUITES_FINISHED = "FILTERING_SUITES_FINISHED";

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

    service.getList().then((result) => {

        let filters = service.getFilters();
        let filterString = Object.keys(filters).length ? "/?" + service.stringifyFilters(service.getFilters()) : "/";

        window.history.pushState("", "", filterString);
        dispatch(filteringSuitesFinished(result))

    })

    return {
        type: FILTERING_SUITES_STARTED
    }
}

