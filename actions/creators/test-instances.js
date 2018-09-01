import ScoreApiService from "../../services/api/ScoreApiService";

export const FILTERING_STARTED = "FILTERING_STARTED";
export const FILTERING_FINISHED = "FILTERING_FINISHED";

export function filteringFinished(scores){
    return {
        type: FILTERING_FINISHED,
        scores
    };
}

export function filteringStarted(searchText, filterName, dispatch){
    let service = new ScoreApiService();

    if (searchText.length > 0)
        service.setupFilter(filterName, searchText);
    else
        service.deleteFilter(filterName);

    service.getList().then((result) => {

        window.history.pushState("", "", "/?" + service.stringifyFilters(service.getFilters()));
        dispatch(filteringFinished(result))

    })

    return {
        type: FILTERING_STARTED
    }
}
