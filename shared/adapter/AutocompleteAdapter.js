class AdapterException {

    message = '';

    constructor(message){
        this.message = message;
    }
}

export default class AutocompleteAdapter {

    constructor(tableData) {
        this.tableData = tableData
        return this;
    }

    getTableData(){
        return this.tableData
    }

    getAutocompleteData(){
        // should be implemented in child classes
        return this.getTableData();
    }

}
