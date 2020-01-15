import BaseInitialStateService from "./BaseInitialStateService";
import FilteringService from "../FilteringService";
import ScoresApiService from "../api/ScoresApiService";
import TestSuitesGriddleAdapter from "../../shared/adapter/TestSuitesGriddleAdapter";
import TestSuitesAutocompleteAdapter from "../../shared/adapter/TestSuitesAutocompleteAdapter";
import Config from "../../shared/Config";
import ScoreMatrixGriddleAdapter from "../../shared/adapter/ScoreMatrixGriddleAdapter";

export default class TestSuitesInitialStateService extends BaseInitialStateService {
    initialStateTemplate = {
      data: [
        {
          suiteObject: " ",
          avgScore: [],
          testsCount: "",
          model: {},
          owner: "",
          timestamp: " ",
          _timestamp: " "
        }
      ],
      scoreMatrixTableDataList: {},
      scoreMatrixList: {},
      hiddenModels:[],
      filters: {},
      dateFilterChanged: false,
      showLoading: false,
      autoCompleteData: {
        suiteObject: [],
        avgScore: [],
        testsCount: [],
        model: [],
        owner: [],
        timestamp: [],
        _timestamp: []
      }
    }

    loadScores (){
      let filteringS = FilteringService.getInstance();
      let service = new ScoresApiService();
      let namespace = Config.suitesNamespace;
      filteringS.setupFilter("with_suites", true, namespace);

      let keys = Object.keys(filteringS.getFilters(namespace, true)).filter(key => !Config.cachableFilters.includes(key));

      return service.getList(!keys.length > 0, namespace);
    }

    async generateInitialState (){
      const scores = await this.loadScores();
      let initialState = this.getInitialStateTemplate();
      initialState.data = new TestSuitesGriddleAdapter(scores)
        .getGriddleData();
      initialState.autoCompleteData = new TestSuitesAutocompleteAdapter(initialState.data)
        .getAutocompleteData();
      let scoreMatrixAdapter = ScoreMatrixGriddleAdapter.getInstance(scores);

      initialState.scoreMatrixTableDataList = scoreMatrixAdapter.getGriddleData();
      initialState.scoreMatrixList = scoreMatrixAdapter.getScoreMatrix();

      return initialState;
    }

}