import BaseModel from "./BaseModel";

export default class TestClass extends BaseModel {

  constructor (data){
    super(data);

    this.id = 0;
    this.url = "";
    this.class_name = "";
    this.units = "";
    this.observation_schema = {};
    this.test_parameters_schema = {};

    if (!data){
      return;
    }

    Object.assign(this, data);
  }

}
