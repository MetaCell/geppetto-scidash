import ScidashStorage from '../../shared/ScidashStorage';
import Helper from '../../shared/Helper';


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

    setupFilter(key, value){
        let currentFilters = {}

        try{
            currentFilters = JSON.parse(this.storage.getItem('filters'))
        } catch (err) { }

        let newFilter = {}

        newFilter[key] = value;

        this.storage.setItem('filters', JSON.stringify({
            ...currentFilters,
            ...newFilter
        }))

        return this;
    }

    deleteFilter(key){

        let currentFilters = JSON.parse(this.storage.getItem('filters'))
        delete currentFilters[key];

        this.storage.setItem('filters', JSON.stringify({
            ...currentFilters,
        }))

        return this;
    }

    getFilters(){
        if (this.storage.getItem("filters"))
            return JSON.parse(this.storage.getItem("filters"));
        else
            return {}
    }

    clearFilters(){
        this.storage.setItem("filters", "");
    }

    clearCache(storage){
        storage.clear()
    }

    saveToCache(key, data){
        let dumpedData = JSON.stringify(data);

        this.storage.setItem(key, dumpedData)

        setTimeout(this.clearCache, this.cacheExpires, this.storage);
    }

    getFromCache(key){
        return JSON.parse(this.storage.getItem(key))
    }

    getList(cache = false){

        if (this.endpoint === null){
            throw new ApiServiceException("You should define API endpoint");
        }

        let queryPath = this.endpoint + (this.getFilters() ? "?" + this.stringifyFilters(this.getFilters()) : "");

        if (this.storage.getItem(queryPath)){
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
