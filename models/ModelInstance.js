import BaseModel from "./BaseModel";
import ModelClass from "./ModelClass";
import Validator from "../shared/Validator";

export default class ModelInstance extends BaseModel {


  constructor (data){
    super(data);

    this.id = 0;
    this.model_class = new ModelClass();
    this.hash_id = "";
    this.tags = [];
    this.backend = null;
    this.attributes = {};
    this.name = "";
    this.run_params = {};
    this.timestamp = new Date();
    this.url = "";

    this.rules = {
      name: [Validator.required],
      url: [Validator.required, Validator.url]
    };

    this.validationMessages = {
      "required-name": "Name is required",
      "url-url": "Url is not valid",
      "required-url": "Url is required"
    };

    if (!data){
      return;
    }

    Object.assign(this, data);

    this.model_class = new ModelClass(data.model_class);
  }
}