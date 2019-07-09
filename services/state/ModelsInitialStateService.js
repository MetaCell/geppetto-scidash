import BaseInitialStateService from "./BaseInitialStateService";
import ModelsGriddleAdapter from "../../shared/adapter/ModelsGriddleAdapter";
import ModelsAutocompleteAdapter from "../../shared/adapter/ModelsAutocompleteAdapter";
import ModelsApiService from "../api/ModelsApiService";
import FilteringService from "../FilteringService";
import Config from "../../shared/Config";

export default class ModelsInitialStateService extends BaseInitialStateService {

    initialStateTemplate = {
      data: [
        {
          name: " ",
          class: " ",
          source: " ",
          tags: [],
          owner: " ",
          timestamp: " "
        }
      ],
      autoCompleteData:{
        name: [], class: [], tags: [], owner: []
      }
    }

    loadModels (){
      let filteringS = FilteringService.getInstance();
      let service = new ModelsApiService();
      let namespace = Config.modelInstancesNamespace;

      return service.getList(false, namespace);
    }

    async generateInitialState (){
      const models = await this.loadModels();
      let initialState = this.getInitialStateTemplate();
      initialState.data = new ModelsGriddleAdapter(models)
        .getGriddleData();
      initialState.autoCompleteData = new ModelsAutocompleteAdapter(initialState.data)
        .getAutocompleteData();
      return initialState;
    }

}