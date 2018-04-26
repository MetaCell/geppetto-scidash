define(function(require){

    var Store = require('../ScidashStore');

    return class ScoreService {
        constructor(){
            this.scoresStore = new Store('scores');
        }

        getAll(filters){
            return this.scoresStore.getAll({
                'query': filters
            })
        }
    }
})
