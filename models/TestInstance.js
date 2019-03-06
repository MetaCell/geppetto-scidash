import BaseModel from "./BaseModel";
import TestClass from "./TestClass";
import Validator from "../shared/Validator";

export default class TestInstance extends BaseModel {

  constructor (data){
    super(data);

    this.id = 0;
    this.test_class = new TestClass();
    this.hash_id = "";
    this.tags = [];
    this.name = "";
    this.observation = {};
    this.params = {};
    this.timestamp = new Date();
    this.description = "";

    this.rules = {
      name: [Validator.required],
      observation: [Validator.requiredAll],
      params: [Validator.requiredAll],
    };

    this.validationMessages = {
      "required-name": "Name is required",
      "requiredAll-observation": "Missed observations :info",
      "requiredAll-params": "Missed parameters :info",
    };


    if (!data){
      return;
    }

    Object.assign(this, data);

    this.test_class = new TestClass(data.test_class);

    let schema = Array.isArray(this.test_class.observation_schema) ? 
      this.test_class.observation_schema[0] : this.test_class.observation_schema;

    if (!Object.keys(this.observation).length){
      for (let key of Object.keys(schema)){
        this.observation[key] = "";
      }
    }

    if (!Object.keys(this.params).length){
      for (let key of Object.keys(this.test_class.test_parameters_schema)){
        this.params[key] = "";
      }
    }

  }
}
