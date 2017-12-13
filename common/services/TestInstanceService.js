define(function(require){

    var Store = require('react-at-rest').Store;

    Store.API_PATH_PREFIX = '/api';
    Store.API_ENVELOPE = false;

    return class TestInstanceService {
        constructor(){
            this.testInstanceStore = new Store('test-instances');
        }

        getAll(filters){
            return this.testInstanceStore.getAll({
                'query': filters
            })
        }
    }
})

