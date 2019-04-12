import ApiService from "./ApiService";
import FilteringService from "../FilteringService";

export default class ModelsApiService extends ApiService {

    endpoint = "/api/model-instances/"

    getModelId(id = null, cache = false, namespace = "") {
        let filteringS = FilteringService.getInstance();

        if (this.endpoint === null) {
            throw new ApiServiceException("You should define API endpoint");
        }

        if (id === null || id === undefined) {
            throw new ApiServiceException("A valid ID should be provided");
        }

        let queryPath = this.endpoint + id + "/?format=json";

        if (this.storage.getItem(queryPath) && cache) {
            return new Promise(resolve => {
                resolve(this.getFromCache(queryPath));
            });
        }

        let request = fetch(queryPath).then(result => result.json());

        if (cache) {
            return request.then(result => {
                this.saveToCache(queryPath, result);
                return result;
            });
        } else {
            return request;
        }
    }

}
