import BaseInitialStateService from "./BaseInitialStateService";
import FilteringService from "../FilteringService";
import ScoresApiService from "../api/ScoresApiService";
import ScoresGriddleAdapter from "../../shared/adapter/ScoresGriddleAdapter";
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
      filters: {},
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
      let namespace = Config.instancesNamespace;

      let keys = Object.keys(filteringS.getFilters(namespace, true)).filter(key => !Config.cachableFilters.includes(key));

      return service.getList(!keys.length > 0, namespace);
    }

    async generateInitialState (){
      const scores = await this.loadScores();
      return new ScoresGriddleAdapter(scores)
        .getGriddleData();
    }

}