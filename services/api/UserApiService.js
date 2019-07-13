import ApiService from "./ApiService";


export default class UserApiService extends ApiService {

    endpoint = "/api/users/"

    buildUrl (arg){
      return `${this.endpoint}${arg}/`;
    }

    async checkIsLogged (){
      // FIXME: change to 'is-logged request'
      let response = await fetch(this.buildUrl("me"));

      return response.ok;
    }

    async getUser (){
      let response = await fetch(this.buildUrl("me"));

      return response.json();
    }
}
