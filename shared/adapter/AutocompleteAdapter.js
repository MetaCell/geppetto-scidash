
export default class AutocompleteAdapter {

    setup(tableData) {
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
