export default class BaseModel {

  rules = {}
  validationMessages = {}
  errors = []

  constructor (data) {

    if (!data) {
      return;
    }

    Object.assign(this, data);

  }

  validate () {
    this.errors = [];

    for (let field in this.rules){
      for (let method of this.rules[field]){
        if (!method(this, field)){
          if (!(`${method.name}-${field}` in this.validationMessages)) {
            this.errors.push(`${method.name}-${field}`);
          } else {
            this.errors.push(this.validationMessages[`${method.name}-${field}`]);
          }
        }
      }
    }

    return !this.errors.length > 0;
  }
}