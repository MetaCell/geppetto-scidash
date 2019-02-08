

export default class PagesService {

    SCORES_PAGE = "SCORES_PAGE";
    SUITES_PAGE = "SUITES_PAGE";
    TESTS_PAGE = "TESTS_PAGE";
    MODELS_PAGE = "MODELS_PAGE";
    SETTINGS_PAGE = "SETTINGS_PAGE";
    SCHEDULING_PAGE = "SCHEDULLING_PAGE";

    default = "";

    constructor (){
      this.defaultPage = this.SCORES_PAGE;
    }

    getDefaultPage (){
      return this.defaultPage;
    }
}
