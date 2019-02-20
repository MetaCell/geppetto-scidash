import BaseModel from "./BaseModel";
import TestClass from "./TestClass";

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

  constructor (data) {
    super(data);

    if (data) {
      this.test_class = new TestClass(data.test_class);
    }
  }
}
