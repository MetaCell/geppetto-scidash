define(function(require){

    var Store = require('../ScidashStore').ScidashStore;

    Store.API_PATH_PREFIX = '/api';
    Store.API_ENVELOPE = false;

    return class ModelClassService {
        constructor(){
            this.modelClassStore = new Store('model-classes');
        }

        getAll(filters){
            return this.modelClassStore.getAll({
                'query': filters
            })
        }
    }
})


