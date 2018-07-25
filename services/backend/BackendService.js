define(function(require){

    var ScoreService = require('./endpoints-services/ScoreService');
    var TestInstanceService = require('./endpoints-services/TestInstanceService');
    var TestClassService = require('./endpoints-services/TestClassService');
    var TestSuiteService = require('./endpoints-services/TestSuiteService');

    var ModelClassService = require('./endpoints-services/ModelClassService');
    var ModelInstanceService = require('./endpoints-services/ModelInstanceService');
    var CapabilityService = require('./endpoints-services/CapabilityService');

    return {
        score: new ScoreService(),
        testInstance: new TestInstanceService(),
        testClass: new TestClassService(),
        testSuite: new TestSuiteService(),
        modelClass: new ModelClassService(),
        modelInstance: new ModelInstanceService(),
        capability: new CapabilityService()
    }

})
