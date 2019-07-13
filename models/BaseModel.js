export default class BaseModel {

  constructor (data){
    this.rules = {};
    this.validationMessages = {};
    this.errors = {};
  }

  validate () {
    this.errors = {};

    for (let field of Object.keys(this.rules)) {
      for (let method of this.rules[field]){
        let result = method(this, field);
        if (!result.success){
          if (!(`${method.name}-${field}` in this.validationMessages)) {
            this.errors = {
              ...this.errors,
              [field]: `${method.name}`
            };
          } else {
            this.errors = {
              ...this.errors,
              [field] : this.validationMessages[`${method.name}-${field}`].replace(":info", result.additionalInfo)
            };
          }
        }
      }
    }

    return !Object.entries(this.errors).length > 0;
  }
}