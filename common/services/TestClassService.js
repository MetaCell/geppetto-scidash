define(function(require){

    var Store = require('../ScidashStore');

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
