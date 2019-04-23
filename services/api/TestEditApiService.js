import ApiService from "./ApiService";

export default class TestEditApiService extends ApiService {

    endpoint = "/api/test-instances/edit/:id/"

    setId(id) {
        this.endpoint = this.endpoint.replace(":id", id);

        return this;
    }

}
