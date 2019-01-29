import BaseModel from "./BaseModel";
import Capability from "./Capability";

export default class ModelClass extends BaseModel {

    id = 0;
    url = "";
    capabilities = [];
    class_name = "";

    constructor (data) {
      super(data);

      const rawCapabilities = this.capabilities;
      this.capabilities = [];

      for (const capability of rawCapabilities) {
        this.capabilities.push(new Capability(capability));
      }
    }
}