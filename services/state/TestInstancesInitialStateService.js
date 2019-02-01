import BaseInitialStateService from "./BaseInitialStateService";
import TestInstancesApiService from "../api/TestInstancesApiService";
import TestInstancesGriddleAdapter from "../../shared/adapter/TestInstancesGriddleAdapter";
import TestInstancesAutocompleteAdapter from "../../shared/adapter/TestInstancesAutocompleteAdapter";


export default class TestInstancesInitialStateService extends BaseInitialStateService {
    initialStateTemplate = {
      data: [
        {
          id: 0,
          name: " ",
          class: " ",
          tags: [" "],
          owner: " ",
          timestamp: " ",
          block: false
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
      let service = new TestInstancesApiService();

      return service.getList();
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