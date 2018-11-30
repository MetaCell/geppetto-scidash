class AdapterException {

    message = '';

    constructor(message){
        this.message = message;
    }
}


export default class BaseAdapter {

    constructor(rawData){
        this.rawData = rawData;
        return this;
    }

    getRawData(){
        return this.rawData;
    }

    getGriddleData(){
        return this.getRawData();
    }

    getAutocompleteData(){
      return this.getRawData();
  }
}
