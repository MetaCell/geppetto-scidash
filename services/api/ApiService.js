import ScidashStorage from '../../shared/ScidashStorage';
import Helper from '../../shared/Helper';
import Config from '../../shared/Config';


class ApiServiceException {

    message = '';

    constructor(message){
        this.message = message;
    }
}


export default class ApiService {

    endpoint = null;
    defaultFilters = {}
    cacheExpires = 300000
    storage = new ScidashStorage()

    stringifyFilters(filters){
        let params = new URLSearchParams()

        for (let filterName of Object.keys(filters)){
            params.append(filterName, filters[filterName]);
        }

        return params;
    }

    setupFilter(key, value, namespace = null){
        let currentFilters = {}

        try{
            currentFilters = JSON.parse(this.storage.getItem('filters'))
        } catch (err) { }

        let newFilter = {}

        if (namespace)
            newFilter[`${namespace}${Config.namespaceDivider}${key}`] = value;
        else
            newFilter[key] = value

        this.storage.setItem('filters', JSON.stringify({
            ...currentFilters,
            ...newFilter
        }))

        return this;
    }

    deleteFilter(key, namespace = null){

        let currentFilters = JSON.parse(this.storage.getItem('filters'))

        if (namespace)
            delete currentFilters[`${namespace}${Config.namespaceDivider}${key}`]
        else
            delete currentFilters[key];

        this.storage.setItem('filters', JSON.stringify({
            ...currentFilters,
        }))

        return this;
    }

    matchNamespace(namespace, key){
        return new RegExp(`^${namespace}${Config.namespaceDivider}.+$`).test(key)
    }

    hasNamespace(filterName){
        return new RegExp(`^.+${Config.namespaceDivider}.+$`).test(filterName)
    }

    getFilters(namespace = null){
        let result = {};
        console.log("DEBUG");

        if (this.storage.getItem("filters")){

            let filters = JSON.parse(this.storage.getItem("filters"));

            if (namespace){
                for (let filterName of Object.keys(filters)){
                    if(this.matchNamespace(namespace, filterName)){
                        result[filterName.split(Config.namespaceDivider)[1]] = filters[filterName];
                    } else if (!this.hasNamespace(filterName)){
                        result[filterName] = filters[filterName];
                    }
                }
            } else {
                for (let filterName of Object.keys(filters)){
                    if (this.hasNamespace(filterName))
                        result[filterName.split(Config.namespaceDivider)[1]] = filters[filterName];
                    else
                        result[filterName] = filters[filterName];
                }
            }
        } else{
            return {}
        }

        console.log("result "+result);
        return result;
    }

    clearFilters(){
        this.storage.setItem("filters", "");
    }

    clearCache(storage){
        storage.clear()
    }

    clearFiltersByNamespace(namespace){
        let filters = this.getFilters();

        for (filterName in Object.keys(filters)){
            if(this.matchNamespace(namespace))
                this.deleteFilter(filterName, namespace);
        }
    }

    saveToCache(key, data){
        let dumpedData = JSON.stringify(data);

        this.storage.setItem(key, dumpedData)

        setTimeout(this.clearCache, this.cacheExpires, this.storage);
    }

    getFromCache(key){
        return JSON.parse(this.storage.getItem(key))
    }

    getList(cache = false, namespace=Config.instancesNamespace){

        if (this.endpoint === null){
            throw new ApiServiceException("You should define API endpoint");
        }

        let queryPath = this.endpoint + (this.getFilters(namespace) ? "?" + this.stringifyFilters(this.getFilters(namespace)) : "");

        if (this.storage.getItem(queryPath) && cache){
            return new Promise((resolve, reject) => {
                resolve(this.getFromCache(queryPath));
            });
        }

        let request = fetch(queryPath).then((result) => result.json());

        if (cache)
            return request.then((result) =>{
                this.saveToCache(queryPath, result)
                return result;
            });
        else
            return request
    }
}
