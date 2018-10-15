import InitialStateService from '../services/InitialStateService';
import ScoreApiService from '../services/api/ScoreApiService';


export function dateFilterChanged(state, action){
    return {
        ...state,
        dateFilterChanged: true
    };
}

export function dateFilterClear(state, action){
    let initialStateService = new InitialStateService();
    let scoreApiService = new ScoreApiService();

    for (let entry of Object.entries(initialStateService.getInitialState().global.globalFilters)){
        scoreApiService.setupFilter(entry[0], entry[1]);
        action.filter(entry[1], entry[0], action.dispatch, true)
    }


}
