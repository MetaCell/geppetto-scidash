import BaseInitialStateService from "./BaseInitialStateService";
import TestInstancesApiService from "../api/TestInstancesApiService";
import TestInstancesGriddleAdapter from "../../shared/adapter/TestInstancesGriddleAdapter";
import TestInstancesAutocompleteAdapter from "../../shared/adapter/TestInstancesAutocompleteAdapter";
import FilteringService from "../FilteringService";
import Config from "../../shared/Config";


export default class TestInstancesInitialStateService extends BaseInitialStateService {
    initialStateTemplate = {
      data: [
        {
          id: 0,
          name: " ",
          class: " ",
          tags: [],
          owner: " ",
          timestamp: " ",
          block: {
            isBlocker: false,
            testId: 0
          }
        },
      ],
      autoCompleteData: {
        name: [],
        tags: [],
        class: [],
        owner: [],
        timestamp: []
      },
    }

    loadTests (){
      let filteringS = FilteringService.getInstance();
      let service = new TestInstancesApiService();
      let namespace = Config.modelInstancesNamespace;

      return service.getList(false, namespace);
    }

    async generateInitialState (){
      const tests = await this.loadTests();
      let initialState = this.getInitialStateTemplate();
      initialState.data = new TestInstancesGriddleAdapter(tests)
        .getGriddleData();
      initialState.autoCompleteData = new TestInstancesAutocompleteAdapter(initialState.data)
        .getAutocompleteData();
      return initialState;
    }

}