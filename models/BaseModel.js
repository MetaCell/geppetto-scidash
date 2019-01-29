export default class BaseModel {

  constructor (data) {

    if (!data) {
      return;
    }

    const copied = Object.assign({}, data);

    for (let key of Object.keys(copied)){
      this[key] = data[key];
    }
  }
}