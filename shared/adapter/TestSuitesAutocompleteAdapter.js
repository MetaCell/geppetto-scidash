import AutocompleteAdapter from './AutocompleteAdapter';

export default class TestSuitesAutocompleteAdapter extends AutocompleteAdapter {

    getAutocompleteData(){

        let autoCompleteData = {};

        if (this.getTableData().length > 0){
            for (let key of Object.keys(this.getTableData()[0])){
                autoCompleteData[key] = [];

                for (let item of this.getTableData()){
                    switch(key){
                        case "suiteObject":
                            if (!autoCompleteData[key].includes(item[key].name))
                                autoCompleteData[key].push(item[key].name);
                            break;
                        default:
                            if (!autoCompleteData[key].includes(item[key]))
                                autoCompleteData[key].push(item[key]);
                            break;
                    }
                }
            }

        }
        return autoCompleteData;
    }
}
