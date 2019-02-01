import BaseInitialStateService from "./BaseInitialStateService";
import ModelsGriddleAdapter from "../../shared/adapter/ModelsGriddleAdapter";
import ModelsAutocompleteAdapter from "../../shared/adapter/ModelsAutocompleteAdapter";
import ModelsApiService from "../api/ModelsApiService";

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
      let service = new ModelsApiService();
      return service.getList();
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