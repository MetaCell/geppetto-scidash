import BaseAdapter from "./BaseAdapter";
import TestSuitesInitialStateService from "../../services/state/TestSuitesInitialStateService";
import React from "react";

export default class TestSuitesAutocompleteAdapter extends BaseAdapter {

  getAutocompleteData (){

    let autoCompleteData = {};

    if (this.getRawData().length > 0){
      for (let key of Object.keys(this.getRawData()[0])){
        autoCompleteData[key] = [];

        for (let item of this.getRawData()){
          switch (key){
          case "suiteObject":
            if (!autoCompleteData[key].includes(item[key].name)) {
              autoCompleteData[key].push(item[key].name);
            }
            break;
          case "model":
            const name = item[key].model_class !== undefined ? item[key].model_class.class_name : ''
            if (!autoCompleteData[key].includes(name)) {
              autoCompleteData[key].push(name);
            }
            break;
          default:
            if (!autoCompleteData[key].includes(item[key])) {
              autoCompleteData[key].push(item[key]);
            }
            break;
          }
        }
      }

    }

    if (Object.keys(autoCompleteData).length == 0) {
      autoCompleteData = new TestSuitesInitialStateService()
        .getInitialStateTemplate()
        .autoCompleteData;
    }

    return autoCompleteData;
  }
}
