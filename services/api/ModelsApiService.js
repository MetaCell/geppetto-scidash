import ApiService from "./ApiService";
import FilteringService from "../FilteringService";

export default class ModelsApiService extends ApiService {

    endpoint = "/api/model-instances/"

    setId(id) {
        if(this.endpoint.endsWith("model-instances/")) {
            this.endpoint = this.endpoint + id + "/";
        }
        return this;
    }
}
