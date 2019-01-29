import BaseInitialStateService from "./BaseInitialStateService";
import TestInstancesApiService from "../api/TestInstancesApiService";
import TestInstancesGriddleAdapter from "../../shared/adapter/TestInstancesGriddleAdapter";


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
        timestamp: [],
        _timestamp: [],
      },
    }

    loadTests (){
      let service = new TestInstancesApiService();

      return service.getList();
    }

    async generateInitialState (){
      const tests = await this.loadTests();
      return new TestInstancesGriddleAdapter(tests)
        .getGriddleData();
    }
}