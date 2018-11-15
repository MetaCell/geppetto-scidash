import FilteringService from "../services/FilteringService";


export default class PagesService {

    TESTS_PAGE = "instances";
    SUITES_PAGE = "suites";

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
