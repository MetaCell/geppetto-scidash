class ApiServiceException {

    message = '';

    constructor(message){
        this.message = message;
    }
}


export default class ApiService {

    endpoint = null;
    defaultFilters = {}

    stringifyFilters(filters){
        let params = new URLSearchParams()

        for (let filterName of Object.keys(filters)){
            params.append(filterName, filters[filterName]);
        }

        return params;
    }

    getList(filters = {}){

        if (this.endpoint === null){
            throw new ApiServiceException("You should define API endpoint");
        }

        return fetch(this.endpoint + "?" + this.stringifyFilters(filters))
    }
}
