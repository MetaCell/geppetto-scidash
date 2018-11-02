import PagesService from "../services/PagesService";
import ApiService from "../services/api/ApiService";
import Config from "../shared/Config";
import InitialStateService from "../services/InitialStateService";

export function openTestsPage(state, action, type){

    let newState = {
        ...state
    };

    if (type == 'header') {
        newState = {
            ...state,
            suitesActive: false,
            testsActive: true
        };
    } else if (type == 'global') {
        let service = new ApiService();
        let filters = service.getFilters(Config.instancesNamespace);
        let filterString = Object.keys(filters).length ? "/?" + service.stringifyFilters(filters) : "/";

        window.history.pushState("", "", filterString);

        newState = {
            ...state,
            dateFilterChanged: false,
            currentPage: new PagesService().TESTS_PAGE
        };
    }
    return newState;
}

export function openSuitesPage(state, action, type){

    let newState = {
        ...state
    };

    if (type == 'header') {
        newState = {
            ...state,
            testsActive: false,
            suitesActive: true
        };
    } else if (type == 'global') {
        let service = new ApiService();
        let filters = service.getFilters(Config.suiteNamespace);
        let filterString = Object.keys(filters).length ? "/?" + service.stringifyFilters(filters) : "/";

        window.history.pushState("", "", filterString);
        newState = {
            ...state,
            dateFilterChanged: false,
            currentPage: new PagesService().SUITES_PAGE
        };
    }

    return newState;
}
