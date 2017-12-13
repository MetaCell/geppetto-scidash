define(function(require){

    var Store = require('../ScidashStore').ScidashStore;

    Store.API_PATH_PREFIX = '/api';
    Store.API_ENVELOPE = false;

    return class ModelInstanceService {
        constructor(){
            this.modelInstanceStore = new Store('model-instances');
        }

        getAll(filters){
            return this.modelInstanceStore.getAll({
                'query': filters
            })
        }
    }
})


