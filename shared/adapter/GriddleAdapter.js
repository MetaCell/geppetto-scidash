
export default class GriddleAdapter {
    // Base class for griddle data adapters which converts raw data from API to the Griddle format

    setup(rawScores){
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
