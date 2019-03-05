
const number = guineaPig => !Number.isNaN(parseInt(guineaPig));
const required = guineaPig => (guineaPig != "") && (typeof guineaPig != "undefined");

const Validator = {

  required: (model, key) => required(model[key]),

  number: (model, key) => number(model[key]),

  everyNumber: (model, key) => {
    if (Object.entries(model[key]).length == 0){
      return false;
    }

    let result = [];

    Object.entries(model[key]).map(value => {
      result.push(number(value[1]));
    });

    return result.reduce((prev, current) => prev && current);
  }

};

export default Validator;