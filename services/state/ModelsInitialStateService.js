import BaseInitialStateService from "./BaseInitialStateService";
import ModelsGriddleAdapter from "../../shared/adapter/ModelsGriddleAdapter";
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
      ]
    }

    loadModels (){
      let service = new ModelsApiService();
      return service.getList();
    }

    async generateInitialState () {
      const models = await this.loadModels();
      return new ModelsGriddleAdapter(models)
        .getGriddleData();
    }
}