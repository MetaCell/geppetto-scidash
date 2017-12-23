define(function(require){

    var Store = require('../ScidashStore');

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


