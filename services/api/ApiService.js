import ScidashStorage from "../../shared/ScidashStorage";
import Config from "../../shared/Config";
import FilteringService from "../FilteringService";


class ApiServiceException {

    message = "";

    constructor (message){
      this.message = message;
    }
}

export default class ApiService {

    endpoint = null;
    defaultFilters = {}
    cacheExpires = 300000
    storage = new ScidashStorage()

    clearCache (storage){
      storage.clear();
    }


    saveToCache (key, data){
      let dumpedData = JSON.stringify(data);

      this.storage.setItem(key, dumpedData);

      setTimeout(this.clearCache, this.cacheExpires, this.storage);
    }


    getFromCache (key){
      return JSON.parse(this.storage.getItem(key));
    }


    getList (cache = false, namespace = ""){
      let filteringS = FilteringService.getInstance();

      if (this.endpoint === null){
        throw new ApiServiceException("You should define API endpoint");
      }

      let queryPath = this.endpoint + (filteringS.getFilters(namespace, true) ? "?" + filteringS.stringifyFilters(filteringS.getFilters(namespace, true)) : "");

      if (this.storage.getItem(queryPath) && cache){
        return new Promise(resolve => {
          resolve(this.getFromCache(queryPath));
        });
      }

      let request = fetch(queryPath).then(result => result.json());

      if (cache){
        return request.then(result => {
          this.saveToCache(queryPath, result);
          return result;
        });
      } else {
        return request;
      }
    }


    create (model = null){
      if (this.endpoint === null){
        throw new ApiServiceException("You should define API endpoint");
      }

      if (model === null){
        throw new ApiServiceException("I need a data for creation, model is empty");
      }

      this.storage.clear();

      return fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(model)
      });
    }


    update (model = null){
      if (this.endpoint === null){
        throw new ApiServiceException("You should define API endpoint");
      }

      if (model === null){
        throw new ApiServiceException("I need a data for creation, model is empty");
      }

      this.storage.clear();

      return fetch(this.endpoint, {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(model)
      });
    }


    getInstanceId (id = null, cache = false, namespace = "") {
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
