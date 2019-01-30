import BaseModel from "./BaseModel";
import TestClass from "./TestClass";

export default class TestInstance extends BaseModel {

    id = 0;
    test_class = new TestClass();
    hash_id = "";
    tags = [];
    name = "";
    observation = JSON.stringify({
        "mean": 1,
        "std": 2
    });
    timestamp = new Date();

    constructor (data){
      super(data);

      if (data) {
        this.test_class = new TestClass(data.test_class);
      }
    }
}

