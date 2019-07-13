import ApiService from "./ApiService";

export default class ModelCloneApiService extends ApiService {

    endpoint = "/api/model-instances/clone/:id/"

    setId (id){
      this.endpoint = this.endpoint.replace(":id", id);

      return this;
    }

}
