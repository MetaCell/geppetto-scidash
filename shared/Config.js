import PagesService from "../services/PagesService";

const SCORES_NAMESPACE = "scores";
const SUITES_NAMESPACE = "suites";
const TEST_INSTANCES_NAMESPACE = "testInstances";
const MODEL_INSTANCES_NAMESPACE = "modelInstances";
const SETTINGS_NAMESPACE = "settings";
const SCHEDULING_NAMESPACE = "scheduling";
const MODEL_CREATE_NAMESPACE = "modelCreate";

const Config = {};

Config["pageNamespaceMap"] = {};


let pagesService = new PagesService();
Config.pageNamespaceMap[pagesService.SCORES_PAGE] = SCORES_NAMESPACE;
Config.pageNamespaceMap[pagesService.SUITES_PAGE] = SUITES_NAMESPACE;
Config.pageNamespaceMap[pagesService.MODELS_PAGE] = MODEL_INSTANCES_NAMESPACE;
Config.pageNamespaceMap[pagesService.MODELS_CREATE_PAGE] = MODEL_CREATE_NAMESPACE;
Config.pageNamespaceMap[pagesService.TESTS_PAGE] = TEST_INSTANCES_NAMESPACE;
Config.pageNamespaceMap[pagesService.TESTS_CREATE_PAGE] = TEST_INSTANCES_NAMESPACE;
Config.pageNamespaceMap[pagesService.SETTINGS_PAGE] = SETTINGS_NAMESPACE;
Config.pageNamespaceMap[pagesService.SCHEDULING_PAGE] = SCHEDULING_NAMESPACE;


Config["cachableFilters"] = ["timestamp_from", "timestamp_to", "with_suites"];
Config["namespaceDivider"] = ":";
Config["suitesNamespace"] = SUITES_NAMESPACE;
Config["scoresNamespace"] = SCORES_NAMESPACE;
Config["testInstancesNamespace"] = TEST_INSTANCES_NAMESPACE;
Config["modelInstancesNamespace"] = MODEL_INSTANCES_NAMESPACE;
Config["modelCreateNamespace"] = MODEL_CREATE_NAMESPACE;
Config["settingsNamespace"] = SETTINGS_NAMESPACE;
Config["schedulingNamespace"] = SCHEDULING_NAMESPACE;

Config["bannedFilters"] = {};

Config.bannedFilters[SUITES_NAMESPACE] = [];
Config.bannedFilters[MODEL_INSTANCES_NAMESPACE] = ["with_suites"];
Config.bannedFilters[MODEL_CREATE_NAMESPACE] = ["with_suites"];
Config.bannedFilters[SCORES_NAMESPACE] = ["with_suites"];
Config.bannedFilters[TEST_INSTANCES_NAMESPACE] = ["with_suites"];
Config.bannedFilters[SCHEDULING_NAMESPACE] = ["with_suites"];
Config.bannedFilters[SETTINGS_NAMESPACE] = ["with_suites"];


Config["testParametersUnitsMap"] = {
  time: "s", voltage: "V", current: "A"
};

Config["errorStatuses"] = [
  400, 500
];

export default Config;