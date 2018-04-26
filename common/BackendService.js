define(function(require){
    var ScoreService = require('./services/ScoreService');
    var TestInstanceService = require('./services/TestInstanceService');
    var TestClassService = require('./services/TestClassService');
    var TestSuiteService = require('./services/TestSuiteService');

    var ModelClassService = require('./services/ModelClassService');
    var ModelInstanceService = require('./services/ModelInstanceService');
    var CapabilityService = require('./services/CapabilityService');

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
