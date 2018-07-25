define(function(require){

    var Store = require('../../../shared/ScidashStore');

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
