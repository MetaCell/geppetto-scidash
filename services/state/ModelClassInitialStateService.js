import BaseInitialStateService from "./BaseInitialStateService";
import ModelClassApiService from "../api/ModelClassApiService";

export default class ModelClassInitialStateService extends BaseInitialStateService {

    initialStateTemplate = {
      data: [
        
      ]
    }

    loadClasses (){
      let service = new ModelClassApiService();
      return service.getList();
    }

    async generateInitialState () {
      return await this.loadClasses();
    }
}
