import ScidashStorage from "../shared/ScidashStorage";
import Config from "../shared/Config";

export default class FilteringService {

    storage = new ScidashStorage();

    filters = {};
    initialFilters = {};

    static instance = null;

    static getInstance (){
      if (this.instance === null) {
        this.instance = new FilteringService();
      }

      return this.instance;
    }

    constructor (){
      this.extractFromStorage();
    }

    setupFilter (key, value, namespace = Config.scoresNamespace, initial = false, writeToStorage = true){
        console.log(namespace);
      if (Config.bannedFilters[namespace].includes(key)){
        console.warn(`${key} is banned for namespace '${namespace}'`);
        return this;
      }

      if (namespace){

        if (initial) {
          this.initialFilters[`${namespace}${Config.namespaceDivider}${key}`] = value;
        }
        this.filters[`${namespace}${Config.namespaceDivider}${key}`] = value;
      } else {
        if (initial) {
          this.initialFilters[key] = value;
        }
        this.filters[key] = value;
      }

      if (writeToStorage){
        this.writeToStorage();
      }

      return this;
    }

    restoreFromInitial (namespace){
      for (let key of Object.keys(this.initialFilters)){
        if (this.matchNamespace(key, namespace)){
          this.filters[key] = this.initialFilters[key];
        }
      }
      return this;
    }

    setFromGLobalFilters (dispatch) {
      const globalFilterNames = ["owner", "timestamp_from", "timestamp_to"];
      for(let index in globalFilterNames){
        const filterName =  globalFilterNames[index];
        const filterValue = this.getFilter(filterName, Config.globalNamespace);
        dispatch(filterValue, filterName);
      }
    }

    setupFilters (filters = {}, namespace = null, initial = false){
      for (let key of Object.keys(filters)){
        this.setupFilter(key, filters[key], namespace, initial);
      }

      return this;
    }

    deleteFilter (key, namespace = null){
      if (namespace) {
        delete this.filters[`${namespace}${Config.namespaceDivider}${key}`];
      } else {
        delete this.filters[key];
      }

      this.writeToStorage();

      return this;

    }

    deleteFilters (keys = [], namespace = null){
      for (let key of keys){
        this.deleteFilter(key, namespace);
      }

      return this;
    }

    extractFiltersFromQueryString (queryString = "", namespace = null){
      let filters = new URLSearchParams(queryString);
      let parsedFilters = {};

      for (let filter of filters){
        if (/^timestamp_/.test(filter)){

          let date = new Date(filter[1]);

          if (Object.prototype.toString.call(date) === "[object Date]")
          {if (!isNaN(date.getTime()))
          {parsedFilters[filter[0]] = date.toISOString();}}
        } else {
          parsedFilters[filter[0]] = filter[1];
        }
      }

      this.setupFilters(parsedFilters, namespace);

      return this;
    }

    stringifyFilters (filters){
      let params = new URLSearchParams();

      for (let filterName of Object.keys(filters)){
        params.append(filterName, filters[filterName]);
      }

      return params;
    }

    matchNamespace (key, namespace){
      return new RegExp(`^${namespace}${Config.namespaceDivider}.+$`).test(key);
    }

    hasNamespace (filterName){
      return new RegExp(`^.+${Config.namespaceDivider}.+$`).test(filterName);
    }

    getFilter (key, namespace = null){
      let filterName = key;

      if (namespace){
        filterName = `${namespace}${Config.namespaceDivider}${key}`;
      }

      if (filterName in this.filters){
        return this.filters[filterName];
      }
    }

    getFilters (namespace = null, cutNamespace = true){
      let result = {};

      if (namespace){

        for (let filterName of Object.keys(this.filters)){
          if (this.matchNamespace(filterName, namespace)){
            if (cutNamespace){
              filterName = this.cutNamespace(filterName);
              result[filterName] = this.getFilter(filterName, namespace);
            } else {
              result[filterName] = this.getFilter(filterName, namespace);
            }
          } else if (!this.hasNamespace(filterName)){
            result[filterName] = this.getFilter(filterName, namespace);
          }
        }
      } else {
        for (let filterName of Object.keys(this.filters)){
          if (this.hasNamespace(filterName)){
            if (cutNamespace){
              result[this.cutNamespace(filterName)] = this.getFilter(filterName, namespace);
            } else {
              result[filterName] = this.getFilter(filterName, namespace);
            }
          } else {
            result[filterName] = this.getFilter(filterName, namespace);
          }
        }
      }

      return result;
    }

    cutNamespace (key){
      if (!this.hasNamespace(key)){
        return key;
      }

      return key.split(Config.namespaceDivider)[1];
    }

    clearFilters (){
      this.filters = {};
      this.writeToStorage();

      return this;
    }

    clearFiltersByNamespace (namespace){
      for (let key of Object.keys(this.filters)){
        if (this.matchNamespace(key, namespace)) {
          this.deleteFilter(this.cutNamespace(key), namespace);
        }
      }

      return this;
    }

    writeToStorage (){
      this.storage.setItem("filters", JSON.stringify(this.filters));
      this.storage.setItem("initialFilters", JSON.stringify(this.initialFilters));

      return this;
    }

    extractFromStorage (initial = false){
      let key = initial ? "initialFilters" : "filters";
      this.filters = JSON.parse(this.storage.getItem(key));

      if (this.filters === null) {
        this.filters = {};
      }

      return this;
    }
}
