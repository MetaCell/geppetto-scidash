import BaseInitialStateService from "./BaseInitialStateService";
import TestClassApiService from "../api/TestClassApiService";

export default class ModelClassInitialStateService extends BaseInitialStateService {

    initialStateTemplate = {
      data: [
        
      ]
    }

    loadClasses (){
      let service = new TestClassApiService();
      return service.getList();
    }

    async generateInitialState () {
      return await this.loadClasses();
    }
}
