import Config from "../shared/Config";

export default class PagesService {

  SCORES_PAGE = "/";
  SUITES_PAGE = "/suite-scores/";
  TESTS_PAGE = "/test-instances/";
  TESTS_CREATE_PAGE = "/test-instances/create/";
  MODELS_PAGE = "/model-instances/";
  MODELS_CREATE_PAGE = "/model-instances/create/";
  SETTINGS_PAGE = "/settings/";
  SCHEDULING_PAGE = "/scheduling/";
  MODELS_EDIT_PAGE = "/model-instances/edit/";
  TESTS_EDIT_PAGE = "/test-instances/edit/";

  default = "";

  constructor () {
    this.defaultPage = this.SCORES_PAGE;
  }

  getDefaultPage () {
    return this.defaultPage;
  }

  getCurrentNamespace () {
    return Config.pageNamespaceMap[location.pathname];
  }
}
