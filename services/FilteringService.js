import ScidashStorage from "../shared/ScidashStorage";
import Config from "../shared/Config";
import Helper from "../shared/Helper";

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
      const filter_ns = Helper.getNamespaceFromKey(key, namespace);
      if (Config.bannedFilters[filter_ns].includes(key)){
        console.warn(`${key} is banned for namespace '${filter_ns}'`);
        return this;
      }

      if (filter_ns){
        let x = filter_ns + Config.namespaceDivider + key;
        if (initial) {
          this.initialFilters[x] = value;
        }
        this.filters[x] = value;
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

    restoreFromInitial (namespace, key = null){
      for (let k of Object.keys(this.initialFilters)){
        if ((key === null) || (k === namespace + Config.namespaceDivider + key)){
          const filter_ns = Helper.getNamespaceFromKey(k.split(Config.namespaceDivider)[1], namespace);
          if (this.matchNamespace(k, filter_ns)){
            this.filters[k] = this.initialFilters[k];
          }
        }
      }
      return this;
    }

    setFromGLobalFilters (dispatch) {
      const globalFilterNames = ["owner", "timestamp_from", "timestamp_to"];
      for (let index in globalFilterNames){
        const filterName = globalFilterNames[index];
        const filterValue = this.getFilter(filterName, Config.globalNamespace);
        dispatch(filterValue, filterName);
      }
    }

    setupFilters (filters = {}, namespace = null, initial = false){
      for (let key of Object.keys(filters)){
        const filter_ns = Helper.getNamespaceFromKey(key, namespace);
        this.setupFilter(key, filters[key], filter_ns, initial);
      }

      return this;
    }

    deleteFilter (key, namespace = null){
      const filter_ns = Helper.getNamespaceFromKey(key, namespace);

      if (filter_ns) {
        delete this.filters[`${filter_ns}${Config.namespaceDivider}${key}`];
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

      this.clearFiltersByNamespace(namespace);
      this.restoreFromInitial('global');

      for (let filter of filters){
        if (/^timestamp_/.test(filter)){

          let date = new Date(filter[1]);

          if (Object.prototype.toString.call(date) === "[object Date]") {
            if (!isNaN(date.getTime())) {
              parsedFilters[filter[0]] = date.toISOString();
            }
          }
        } else {
          parsedFilters[filter[0]] = filter[1];
        }
      }

      this.setupFilters(parsedFilters, namespace);

      return this;
    }

    getQueryString (namespace = null) {
      let globalFilters = "" + this.stringifyFilters(this.getFilters('global', true));
      if (globalFilters && globalFilters.length > 0){
        globalFilters = globalFilters + "&";
      }
      return (this.getFilters(namespace, true)
        ? "?" + globalFilters + this.stringifyFilters(this.getFilters(namespace, true))
        : "");
    }

    stringifyFilters (filters){
      let params = new URLSearchParams();

      for (let filterName of Object.keys(filters)){
        params.append(filterName, filters[filterName]);
      }

      return params;
    }

    matchNamespace (key, namespace){
      const filter_ns = Helper.getNamespaceFromKey(key, namespace);
      return new RegExp(`^${filter_ns}${Config.namespaceDivider}.+$`).test(key);
    }

    hasNamespace (filterName){
      return new RegExp(`^.+${Config.namespaceDivider}.+$`).test(filterName);
    }

    getFilter (key, namespace = null){
      let filterName = key;

      if (namespace){
        const filter_ns = Helper.getNamespaceFromKey(key, namespace);
        filterName = `${filter_ns}${Config.namespaceDivider}${key}`;
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
