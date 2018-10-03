import InitialStateService from '../services/InitialStateService';
import ScoreApiService from '../services/api/ScoreApiService';


export function dateFilterChanged(state, action){
    return {
        ...state,
        dateFilterChanged: true
    };
}

export function dateFilterClear(state, action){
    initialStateService = new InitialStateService();

    for (let key of Object.keys(initialStateService.getInitialState().global.globalFilters)){
        
    }
}
