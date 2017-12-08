define(function(require){

    var Store = require('react-at-rest').Store;

    Store.API_PATH_PREFIX = '/api';
    Store.API_ENVELOPE = false;

    class ScoreService {
        constructor(){
            this.scoresStore = new Store('scores');
        }

        getAll(filters){
            return this.scoresStore.getAll({
                'query': filters
            })
        }
    }

    return {
        score: new ScoreService()
    }
})
