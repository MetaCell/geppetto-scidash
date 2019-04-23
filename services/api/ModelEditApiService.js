import ApiService from "./ApiService";

export default class ModelEditApiService extends ApiService {

    endpoint = "/api/model-instances/edit/:id/"

    setId(id) {
        this.endpoint = this.endpoint.replace(":id", id);

        return this;
    }

}
