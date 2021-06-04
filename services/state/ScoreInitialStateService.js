import BaseInitialStateService from "./BaseInitialStateService";
import FilteringService from "../FilteringService";
import ScoresApiService from "../api/ScoresApiService";
// import ScoresGriddleAdapter from "../../shared/adapter/ScoresGriddleAdapter";
// import ScoresAutocompleteAdapter from "../../shared/adapter/ScoresAutocompleteAdapter";
import Config from "../../shared/Config";


export default class ScoreInitialStateService extends BaseInitialStateService {

    initialStateTemplate = {
      data: [
        {
          name: " ",
          score_type: " ",
          _sort_key: 0,
          score: {},
          test_class: " ",
          model: {},
          hostname: " ",
          build_info: " ",
          timestamp: " ",
          _timestamp: " ",
          template: true
        }
      ],
      dateFilterChanged: false,
      showLoading: false,
      autoCompleteData: {
        name: [],
        score: [],
        score_type: [],
        _sort_key: [],
        test_class: [],
        model: [],
        hostname: [],
        owner: [],
        build_info: [],
        timestamp: [],
        _timestamp: [],
        template: true
      }
    }

    loadScores (){
      let filteringS = FilteringService.getInstance();
      let service = new ScoresApiService();
      let namespace = Config.scoresNamespace;

      let keys = Object.keys(filteringS.getFilters(namespace, true)).filter(key => !Config.cachableFilters.includes(key));

      return service.getList(!keys.length > 0, namespace);
    }

    async generateInitialState (){
      // 2021-06-04 ZS: imho there is no need to pre load data
      
      //const scores = await this.loadScores();
      let initialState = this.getInitialStateTemplate();
      //initialState.data = new ScoresGriddleAdapter(scores)
      //  .getGriddleData();
      //initialState.autoCompleteData = new ScoresAutocompleteAdapter(initialState.data)
      //  .getAutocompleteData();
      return initialState;
    }

}