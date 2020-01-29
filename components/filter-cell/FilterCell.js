/* eslint-disable no-use-before-define */
import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
const FilterCell = ({
  title,
  icon,
  value,
  filterName,
  styleDefault,
  styleInputDefault,
  menuStyle,
  listStyle,
  autoCompleteData,
  columnId,
  onFilterUpdate
}) => (
  <span>
    <p>
      {title}
      {icon}
    </p>
    <Autocomplete
      className="scidash-materialui-field"
      searchText={value}
      popoverProps={{
        color: "red",
        backgroundColor: "blue",
        className: "autosuggest"
      }}
      filter={Autocomplete.caseInsensitiveFilter}
      onClick={event => {
        event.stopPropagation();
      }}
      hintText={"Filter " + title}
      style={styleDefault}
      textFieldStyle={styleInputDefault}
      menuStyle={menuStyle}
      listStyle={listStyle}
      onUpdateInput={searchText => onFilterUpdate(searchText, filterName)}
      dataSource={autoCompleteData[columnId]}
    />
  </span>
);

export default FilterCell;
