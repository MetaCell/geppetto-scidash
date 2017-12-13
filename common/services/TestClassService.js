define(function(require){

    var Store = require('react-at-rest').Store;

    Store.API_PATH_PREFIX = '/api';
    Store.API_ENVELOPE = false;

    return class TestClassService {
        constructor(){
            this.testClassStore = new Store('test-classes');
        }

        getAll(filters){
            return this.testClassStore.getAll({
                'query': filters
            })
        }
    }
})
