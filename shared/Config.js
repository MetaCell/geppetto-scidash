const INSTANCES_NAMESPACE = "instances";
const SUITE_NAMESPACE = "suites";
const MODEL_INSTANCES_NAMESPACE = "modelInstances"

const Config = {};

Config["cachableFilters"] = ["timestamp_from", "timestamp_to", "with_suites"];
Config["namespaceDivider"] = ":";
Config["suiteNamespace"] = SUITE_NAMESPACE;
Config["instancesNamespace"] = INSTANCES_NAMESPACE;
Config["modelInstancesNamespace"] = MODEL_INSTANCES_NAMESPACE;

Config["bannedFilters"] = {}

Config.bannedFilters[SUITE_NAMESPACE] = [];
Config.bannedFilters[MODEL_INSTANCES_NAMESPACE] = [];
Config.bannedFilters[INSTANCES_NAMESPACE] = ["with_suites"];

export default Config;
