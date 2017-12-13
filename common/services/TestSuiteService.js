define(function(require){

    var Store = require('react-at-rest').Store;

    Store.API_PATH_PREFIX = '/api';
    Store.API_ENVELOPE = false;

    return class TestSuiteService {
        constructor(){
            this.testSuitesStore = new Store('test-suites');
        }

        getAll(filters){
            return this.testSuitesStore.getAll({
                'query': filters
            })
        }
    }
})
