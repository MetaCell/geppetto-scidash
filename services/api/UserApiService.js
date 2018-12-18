import ApiService from "./ApiService";


export default class UserApiService extends ApiService {

    endpoint = "/api/users/"

    buildUrl(arg){
        return `${this.endpoint}${arg}/`
    }

    checkIsLogged(){
        return fetch(this.buildUrl('is-logged'));
    }

    getUser(){
        return fetch(this.buildUrl('me'));
    }
}

