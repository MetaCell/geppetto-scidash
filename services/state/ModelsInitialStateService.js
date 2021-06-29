import BaseInitialStateService from "./BaseInitialStateService";
/*
 * import ModelsGriddleAdapter from "../../shared/adapter/ModelsGriddleAdapter";
 * import ModelsAutocompleteAdapter from "../../shared/adapter/ModelsAutocompleteAdapter";
 */
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
      showLoading: false,
      autoCompleteData:{ name: [], class: [], tags: [], owner: [] }
    }

    loadModels (){
      let filteringS = FilteringService.getInstance();
      let service = new ModelsApiService();
      let namespace = Config.modelInstancesNamespace;

      return service.getList(false, namespace);
    }

    async generateInitialState (){
      /*
       * 2021-06-04 ZS: imho there is no need to pre load data
       *
       * const models = await this.loadModels();
       * initialState.data = new ModelsGriddleAdapter(models)
       *   .getGriddleData();
       * initialState.autoCompleteData = new ModelsAutocompleteAdapter(initialState.data)
       *   .getAutocompleteData();
       */
      let initialState = this.getInitialStateTemplate();
      return initialState;
    }

}