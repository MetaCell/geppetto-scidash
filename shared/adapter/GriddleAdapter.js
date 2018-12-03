class AdapterException {

    message = '';

    constructor(message){
        this.message = message;
    }
}

// FIXME: Griddle and Autocomplete adapters are too similar, should be one abstract class for all adapters
export default class GriddleAdapter {
    // Base class for griddle data adapters which converts raw data from API to the Griddle format

    constructor(rawScores){
        this.scores = rawScores;
        return this;
    }

    getScores(){
        return this.scores;
    }

    getGriddleData(){
        // should be implemented in child classes
        return this.getScores();
    }
}
