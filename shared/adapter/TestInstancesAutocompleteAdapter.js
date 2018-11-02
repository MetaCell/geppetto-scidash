import AutocompleteAdapter from "./AutocompleteAdapter";
import InitialStateService from "../../services/InitialStateService";

export default class TestInstancesAutocompleteAdapter extends AutocompleteAdapter {

    getAutocompleteData(){

        let autoCompleteData = {};

        if (this.getTableData().length > 0 && !this.getTableData()[0].template){
            for (let key of Object.keys(this.getTableData()[0])){
                autoCompleteData[key] = [];

                for (let item of this.getTableData()){

                    if (key == "model"){
                        if (!autoCompleteData[key].includes(item[key]["model_class"]["class_name"]))
                            autoCompleteData[key].push(item[key]["model_class"]["class_name"])
                        if (!autoCompleteData[key].includes(item[key]["name"]))
                            autoCompleteData[key].push(item[key]["name"])
                    } else {
                        if (!autoCompleteData[key].includes(item[key]))
                            autoCompleteData[key].push(item[key]);
                    }
                }
            }
        }

        if (Object.keys(autoCompleteData).length == 0)
            autoCompleteData = new InitialStateService()
                .getInitialState()
                .testInstances
                .autoCompleteData

        return autoCompleteData;
    }
}
