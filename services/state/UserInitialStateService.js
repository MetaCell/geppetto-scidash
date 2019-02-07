
import BaseInitialStateService from "./BaseInitialStateService";
import UserApiService from "../api/UserApiService";

export default class UserInitialStateService extends BaseInitialStateService {
    initialStateTemplate = {
      isLogged: false,
      userObject: {}
    }

    async generateInitialState (){
      let service = new UserApiService();
      let initialState = this.getInitialStateTemplate();

      initialState.isLogged = await service.checkIsLogged();
      initialState.userObject = await service.getUser();

      return initialState;
    }
}