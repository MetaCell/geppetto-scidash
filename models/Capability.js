import BaseModel from "./BaseModel";

export default class Capability extends BaseModel {

  constructor (data){
    super(data);

    this.id = 0;
    this.class_name = "";

    if (!data){
      return;
    }

    Object.assign(this, data);
  }

}