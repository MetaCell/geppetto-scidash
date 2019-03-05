import BaseModel from "./BaseModel";
import TestClass from "./TestClass";
import Validator from "../shared/Validator";

export default class TestInstance extends BaseModel {

  id = 0;
  test_class = new TestClass();
  hash_id = "";
  tags = [];
  name = "";
  observation = "";
  params = "";
  timestamp = new Date();
  description = "";

  rules = {
    name: [Validator.required],
    observation: [Validator.required, Validator.everyNumber],
    params: [Validator.required, Validator.everyNumber],
  }

  validationMessages = {
    "required-name": "Name is required",
    "required-observation": "Observation is required",
    "everyNumber-observation": "Every member of observation should be a number",
    "required-params": "Params is required",
    "everyNumber-params": "Every member of params should be a number"
  }

  constructor (data) {
    super(data);

    if (!data) {
      return;
    }

    Object.assign(this, data);

    if (data) {
      this.test_class = new TestClass(data.test_class);
    }
  }
}
