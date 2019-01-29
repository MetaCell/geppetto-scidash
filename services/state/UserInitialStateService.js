
import BaseInitialStateService from "./BaseInitialStateService";
import UserApiService from "../api/UserApiService";

export default class UserInitialStateService extends BaseInitialStateService {
    initialStateTemplate = {
      isLogged: false,
      userObject: {}
    }

    loadUser (){
      let service = new UserApiService();

      return service.getUser();
    }

    async generateInitialState (){
      return this.loadUser();
    }
}