import ApiService from './ApiService';


export default class TestInstancesApiService extends ApiService {

    endpoint = '/api/test-instances/';

    setId(id) {
        if(this.endpoint.endsWith("test-instances/")) {
            this.endpoint = this.endpoint + id + "/";
        }
        return this;
    }

}
