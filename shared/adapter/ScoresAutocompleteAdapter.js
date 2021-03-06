import BaseAdapter from "./BaseAdapter";
import ScoreInitialStateService from "../../services/state/ScoreInitialStateService";

export default class ScoresAutocompleteAdapter extends BaseAdapter {

  getAutocompleteData (){

    let autoCompleteData = {};

    if (this.getRawData().length > 0 && !this.getRawData()[0].template){
      for (let key of Object.keys(this.getRawData()[0])){
        autoCompleteData[key] = [];

        for (let item of this.getRawData()){

          if (key == "model"){
            if (!autoCompleteData[key].includes(item[key]["model_class"]["class_name"])) {
              autoCompleteData[key].push(item[key]["model_class"]["class_name"]);
            }
            if (!autoCompleteData[key].includes(item[key]["name"])) {
              autoCompleteData[key].push(item[key]["name"]);
            }
          } else {
            if (!autoCompleteData[key].includes(item[key])) {
              autoCompleteData[key].push(item[key]);
            }
          }
        }
      }
    }

    if (Object.keys(autoCompleteData).length == 0) {
      autoCompleteData = new ScoreInitialStateService()
        .getInitialStateTemplate()
        .autoCompleteData;
    }

    return autoCompleteData;
  }
}
