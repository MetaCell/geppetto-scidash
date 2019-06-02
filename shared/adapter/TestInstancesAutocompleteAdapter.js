import BaseAdapter from "./BaseAdapter";
import TestInstancesInitialStateService from "../../services/state/TestInstancesInitialStateService";

export default class TestInstancesAutocompleteAdapter extends BaseAdapter {

  getAutocompleteData (){

    let autoCompleteData = {};

    if (this.getRawData().length > 0){
      for (let key of Object.keys(this.getRawData()[0])){
        autoCompleteData[key] = [];

        for (let item of this.getRawData()){
          if (!Array.isArray(item[key])){
            if (!autoCompleteData[key].includes(item[key])) {
              autoCompleteData[key].push(item[key]);
            }
          } else {
            for (let el of item[key]){
              if (!autoCompleteData[key].includes(el)) {
                autoCompleteData[key].push(el);
              }
            }
          }

        }
      }
    }
    if (Object.keys(autoCompleteData).length == 0) {
      autoCompleteData = new TestInstancesInitialStateService()
        .getInitialStateTemplate()
        .autoCompleteData;
    }

    return autoCompleteData;
  }
}