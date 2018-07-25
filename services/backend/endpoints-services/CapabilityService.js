define(function(require){

    var Store = require('../../../shared/ScidashStore');

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
