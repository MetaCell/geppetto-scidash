import ScidashStorage from "../shared/ScidashStorage";
import Config from "../shared/Config";

class FilteringService {
    storage = new ScidashStorage();

    filters = {};

    static instance = null;

    static getInstance(){
        if (this.instance === null)
            this.instance = new FilteringService();

        return this.instance;
    }

    constructor(){
        this.extractFromStorage();
    }

    setupFilter(key, value, namespace=null){
        if (namespace)
            this.filters[`${namespace}${Config.namespaceDivider}${key}`] = value;
        else
            this.filters[key] = value

        this.writeToStorage();

        return this;
    }

    setupFilters(filters={}, namespace=null){
        this.filters = {
            ...this.filters,
            ...filters
        }

        this.writeToStorage();

        return this;
    }

    deleteFilter(key, namespace=null){
        if (namespace)
            delete this.filters[`${namespace}${Config.namespaceDivider}${key}`]
        else
            delete this.filters[key];

        this.writeToStorage();

        return this;

    }

    deleteFilters(keys=[], namespace=null){
        for (let key of keys){
            this.deleteFilter(key, namespace);
        }

        return this;
    }

    stringifyFilters(filters){
        let params = new URLSearchParams()

        for (let filterName of Object.keys(filters)){
            params.append(filterName, filters[filterName]);
        }

        return params;
    }

    matchNamespace(key, namespace){
        return new RegExp(`^${namespace}${Config.namespaceDivider}.+$`).test(key)
    }

    hasNamespace(filterName){
        return new RegExp(`^.+${Config.namespaceDivider}.+$`).test(filterName)
    }

    getFilter(key, namespace=null){

    }

    getFilters(namespace=null){

    }

    clearFilters(){}
    clearFiltersByNamespace(namespace){}

    writeToStorage(){
        this.storage.setItem("filters", JSON.stringify(this.filters))

        return this;
    }

    extractFromStorage(){
        try{
            this.filters = JSON.parse(this.storage.getItem('filters'));
        } catch(err) {
            this.filters = {};
        }

        return this;
    }
}
