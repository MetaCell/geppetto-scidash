import BaseModel from "./BaseModel";

export default class Capability extends BaseModel {

  constructor (data){
    super(data);

    this.id = null;
    this.class_name = "";

    if (!data){
      return;
    }

    Object.assign(this, data);
  }

}