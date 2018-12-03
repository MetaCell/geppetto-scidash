import FilteringService from "../services/FilteringService";


export default class PagesService {

    TESTS_VIEW = "instances";
    SUITES_VIEW = "suites";
    SCORES_PAGE = "SCORES_PAGE";
    TESTS_PAGE = "TESTS_PAGE";
    MODELS_PAGE = "MODELS_PAGE";
    SETTINGS_PAGE = "SETTINGS_PAGE";
    SCHEDULING_PAGE = "SCHEDULLING_PAGE";

    default = "";

    constructor(){
        this.default = this.TESTS_VIEW;
        this.defaultPage = this.SCORES_PAGE;
    }

    getAll(){
        return [TESTS_VIEW, SUITES_VIEW];
    }

    getDefault(){
        return this.default;
    }

    getDefaultPage(){
      return this.defaultPage;
    }
}
