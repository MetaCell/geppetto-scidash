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

const idNotNull = guineaPig => {
  let response = Object.assign({}, responseTemplate);
  response.success = typeof guineaPig.id != "undefined" && guineaPig.id !== null;

  return response;
};

const url = guineaPig => {
  let response = Object.assign({}, responseTemplate);
  let pattern = new RegExp("^(https?:\\/\\/)?" // protocol
    + "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" // domain name
    + "((\\d{1,3}\\.){3}\\d{1,3}))" // OR ip (v4) address
    + "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" // port and path
    + "(\\?[;&a-z\\d%_.~+=-]*)?" // query string
    + "(\\#[-a-z\\d_]*)?$","i");

  response.success = pattern.test(guineaPig);

  return response;
};

const Validator = {

  required: (model, key) => required(model[key]),

  number: (model, key) => number(model[key]),

  idNotNull: (model, key) => idNotNull(model[key]),

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

  requiredParams: (model, key) => {
    if (Object.entries(model[key]).length == 0){
      return {
        success: false,
        additionalInfo: ""
      };
    }

    let result = [];

    Object.entries(model[key]).map(value => {
      if (!model.test_class.test_parameters_schema[value[0]].required) {
        result.push([true, value[0]]);
      } else {
        result.push([required(value[1]).success, value[0]]);  
      }
    });

    let finalResult = {
      success: result.reduce((prev, current) => prev && current[0]),
      additionalInfo: result.filter(value => !value[0]).map(value => value[1]).join(", ")
    };

    return finalResult;
  },

  url: (model, key) => url(model[key]),

  numberAll: (model, key) => {
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