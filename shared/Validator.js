const responseTemplate = {
  success: false,
  additionalInfo: null
};

const number = guineaPig => {
  let response = Object.assign({}, responseTemplate);
  response.success = !Number.isNaN(parseInt(guineaPig));

  return response;
};

const required = guineaPig => {
  let response = Object.assign({}, responseTemplate);
  response.success = (guineaPig != "") && (typeof guineaPig != "undefined");

  return response;
};

const Validator = {

  required: (model, key) => required(model[key]),

  number: (model, key) => number(model[key]),

  requiredAll: (model, key) => {
    if (Object.entries(model[key]).length == 0){
      return {
        success: false,
        additionalInfo: ""
      };
    }

    let result = [];

    Object.entries(model[key]).map(value => {
      result.push([required(value[1]).success, value[0]]);
    });

    let finalResult = {
      success: result.reduce((prev, current) => prev && current[0]),
      additionalInfo: result.filter(value => !value[0]).map(value => value[1]).join(", ")
    };

    return finalResult;
  },

  everyNumber: (model, key) => {
    if (Object.entries(model[key]).length == 0){
      return false;
    }

    let result = [];

    Object.entries(model[key]).map(value => {
      result.push([number(value[1]).success, value]);
    });

    let finalResult = {
      success: result.reduce((prev, current) => prev && current[0]),
      additionalInfo: result.filter(value => value[0]).map(value => value[1]).join(", ")
    };

    return finalResult;
  }
};

export default Validator;