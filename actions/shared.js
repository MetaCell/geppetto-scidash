import PagesService from "../services/PagesService";
import ApiService from "../services/api/ApiService";

export function openTestsPage(state, action, type){

    new ApiService().clearFilters();
    window.history.pushState("", "", "/");

    let newState = {
        ...state
    };

    if (type == 'header') {
        let newState = {
            ...state,
            suitesActive: false,
            testsActive: true
        };
    } else if (type == 'global') {
        let newState = {
            ...state,
            currentPage: new PagesService().TESTS_PAGE
        };
    }

    return newState;
}

export function openSuitesPage(state, action, type){

    new ApiService().clearFilters();
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
            currentPage: new PagesService().SUITES_PAGE
        };
    }

    return newState;
}
