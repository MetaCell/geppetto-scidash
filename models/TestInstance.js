import BaseModel from "./BaseModel";
import TestClass from "./TestClass";
import Validator from "../shared/Validator";
import Config from "../shared/Config";

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

  getObservationUnitsMap (){
    let map = {};
    let mergedSchemas = {};

    if (Array.isArray(this.test_class.observation_schema)){
      for (let schema of this.test_class.observation_schema){
        mergedSchemas = {
          ...mergedSchemas,
          ...schema
        };
      }
    } else {
      mergedSchemas = {
        ...this.test_class.observation_schema
      };
    }

    for (let key of Object.keys(mergedSchemas)){
      if (mergedSchemas[key].units) {
        map[key] = this.test_class.units_name;
      } else {
        map[key] = "-"; 
      }
    }
    
    return map;
  }

  getParamsUnitsMap (){
    let map = {};

    for (let key of Object.keys(this.test_class.test_parameters_schema)){
      map[key] = Config.testParametersUnitsMap[
        this.test_class.test_parameters_schema[key].type
      ];
    }
    
    return map;
  }

}
