import BaseAdapter from "./BaseAdapter";
import ModelsInitialStateService from "../../services/state/ModelsInitialStateService";

export default class ModelsAutocompleteAdapter extends BaseAdapter {

  getAutocompleteData (){

    let autoCompleteData = {};

    if (this.getRawData().length > 0){
      for (let key of Object.keys(this.getRawData()[0])){
        autoCompleteData[key] = [];

        for (let item of this.getRawData()){
          if (!autoCompleteData[key].includes(item[key])) {
            autoCompleteData[key].push(item[key]);
          }
        }
      }

    }

    if (Object.keys(autoCompleteData).length == 0) {
      autoCompleteData = new ModelsInitialStateService()
        .getInitialStateTemplate()
        .autoCompleteData;
    }

    return autoCompleteData;
  }
}
