import ScoreApiService from "../../services/api/ScoreApiService";
import Config from '../../shared/Config';

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
        service.setupFilter(filterName, searchText, Config.instancesNamespace);
    else
        service.deleteFilter(filterName, Config.instancesNamespace);

    service.deleteFilter("with_suites");

    service.getList(false, Config.instancesNamespace).then((result) => {

        let filters = service.getFilters(Config.instancesNamespace);

        let filterString = Object.keys(filters).length ? "/?" + service.stringifyFilters(filters) : "/";

        window.history.pushState("", "", filterString);
        dispatch(filteringTestsFinished(result))

    })

    return {
        type: FILTERING_TESTS_STARTED
    }
}
