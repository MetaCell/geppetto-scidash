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

    async setShowInstructions (show){
      let response = await fetch(this.buildUrl("toggle-show-instructions"), {
        method: 'POST',
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify({ 'show': show } ) // body data type must match "Content-Type" header
      });
      return response;
    }

    async getUser (){
      let response = await fetch(this.buildUrl("me"));

      return response.json();
    }
}
