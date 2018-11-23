import FilteringService from "../services/FilteringService";


export default class PagesService {

    TESTS_PAGE = "instances";
    SUITES_PAGE = "suites";
    SCORES_PAGE = "SCORES";
    MODELS_PAGE = "MODELS";
    TESTS_PAGE = "TESTS";
    SETTINGS_PAGE = "SETTINGS";
    SCHEDULER_PAGE = "SCHEDULER";

    default = "";

    constructor(){
        this.default = this.TESTS_PAGE;
    }

    getAll(){
        return [TESTS_PAGE, SUITES_PAGE];
    }

    getDefault(){
        return this.default;
    }

}
