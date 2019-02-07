import ApiService from "./ApiService";


export default class UserApiService extends ApiService {

    endpoint = "/api/users/"

    buildUrl (arg){
      return `${this.endpoint}${arg}/`;
    }

    async checkIsLogged (){
      let response = await fetch(this.buildUrl("is-logged"));

      return response.ok;
    }

    async getUser (){
      let response = await fetch(this.buildUrl("me"));

      return response.json();
    }
}
