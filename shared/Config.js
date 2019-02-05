import PagesService from "../services/PagesService";

const SCORES_NAMESPACE = "scores";
const SUITES_NAMESPACE = "suites";
const TEST_INSTANCES_NAMESPACE = "testInstances";
const MODEL_INSTANCES_NAMESPACE = "modelInstances";
const SETTINGS_NAMESPACE = "settings";

const Config = {};

Config["pageNamespaceMap"] = {};


let pagesService = new PagesService();
Config.pageNamespaceMap[pagesService.MODELS_PAGE] = MODEL_INSTANCES_NAMESPACE;
Config.pageNamespaceMap[pagesService.SCORES_PAGE] = SCORES_NAMESPACE;
Config.pageNamespaceMap[pagesService.SUITES_PAGE] = SUITES_NAMESPACE;
Config.pageNamespaceMap[pagesService.TESTS_PAGE] = TEST_INSTANCES_NAMESPACE;
Config.pageNamespaceMap[pagesService.SETTINGS_PAGE] = SETTINGS_NAMESPACE;


Config["cachableFilters"] = ["timestamp_from", "timestamp_to", "with_suites"];
Config["namespaceDivider"] = ":";
Config["suitesNamespace"] = SUITES_NAMESPACE;
Config["scoresNamespace"] = SCORES_NAMESPACE;
Config["testInstancesNamespace"] = TEST_INSTANCES_NAMESPACE;
Config["modelInstancesNamespace"] = MODEL_INSTANCES_NAMESPACE;

Config["bannedFilters"] = {};

Config.bannedFilters[SUITES_NAMESPACE] = [];
Config.bannedFilters[MODEL_INSTANCES_NAMESPACE] = ["with_suites"];
Config.bannedFilters[SCORES_NAMESPACE] = ["with_suites"];
Config.bannedFilters[TEST_INSTANCES_NAMESPACE] = ["with_suites"];

export default Config;