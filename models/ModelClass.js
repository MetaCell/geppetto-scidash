import BaseModel from "./BaseModel";
import Capability from "./Capability";

export default class ModelClass extends BaseModel {

  constructor (data) {
    super(data);

    this.id = null;
    this.url = "";
    this.capabilities = [];
    this.class_name = "";

    if (!data){
      return;
    }

    Object.assign(this, data);

    const rawCapabilities = this.capabilities;
    this.capabilities = [];

    for (const capability of rawCapabilities) {
      this.capabilities.push(new Capability(capability));
    }
  }
}