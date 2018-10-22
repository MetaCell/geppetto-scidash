import PagesService from "../services/PagesService";
import ApiService from "../services/api/ApiService";
import InitialStateService from "../services/InitialStateService";

export function openTestsPage(state, action, type){

    let apiService = new ApiService();
    let initialStateService = new InitialStateService();
    apiService.clearFilters()

    apiService.setupFilter("timestamp_from", initialStateService.getInitialState()
        .global
        .globalFilters
        .timestamp_from)
    apiService.setupFilter("timestamp_to", initialStateService.getInitialState()
        .global
        .globalFilters
        .timestamp_to)

    window.history.pushState("", "", "/");

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
        newState = {
            ...state,
            dateFilterChanged: false,
            currentPage: new PagesService().TESTS_PAGE
        };
    }
    return newState;
}

export function openSuitesPage(state, action, type){

    let apiService = new ApiService();
    let initialStateService = new InitialStateService();
    apiService.clearFilters();
    apiService.setupFilter("timestamp_from", initialStateService.getInitialState()
        .global
        .globalFilters
        .timestamp_from)
    apiService.setupFilter("timestamp_to", initialStateService.getInitialState()
        .global
        .globalFilters
        .timestamp_to)
    window.history.pushState("", "", "/");

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
        newState = {
            ...state,
            dateFilterChanged: false,
            currentPage: new PagesService().SUITES_PAGE
        };
    }

    return newState;
}
