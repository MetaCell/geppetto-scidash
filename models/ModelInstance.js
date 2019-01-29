import BaseModel from "./BaseModel";
import ModelClass from "./ModelClass";

export default class ModelInstance extends BaseModel {

    id = 0;
    model_class = new ModelClass();
    hash_id = "";
    tags = [];
    backend = null;
    attributes = {};
    name = "";
    run_params = {};
    timestamp = new Date();
    url = "";

    constructor (data){
      super(data);

      if (data) {
        this.model_class = new ModelClass(data.model_class);
      }

      console.log(this);

    }
}