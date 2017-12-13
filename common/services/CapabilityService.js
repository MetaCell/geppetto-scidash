define(function(require){

    var Store = require('../ScidashStore').ScidashStore;

    Store.API_PATH_PREFIX = '/api';
    Store.API_ENVELOPE = false;

    return class CapabilityService {
        constructor(){
            this.capabilityStore = new Store('capabilities');
        }

        getAll(filters){
            return this.capabilityStore.getAll({
                'query': filters
            })
        }
    }
})

