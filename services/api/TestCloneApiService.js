import ApiService from "./ApiService";

export default class TestCloneApiService extends ApiService {

    endpoint = "/api/test-instances/clone/:id/"

    setId (id){
      this.endpoint = this.endpoint.replace(":id", id);

      return this;
    }

}
