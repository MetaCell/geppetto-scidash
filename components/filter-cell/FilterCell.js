/* eslint-disable no-use-before-define */
import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from '@material-ui/core/TextField';
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
      filter={Autocomplete.caseInsensitiveFilter}
      onClick={event => {
        event.stopPropagation();
      }}
      style={styleDefault}
      options={autoCompleteData[columnId]}
      renderInput={params => (
        <TextField {...params} label="Combo box" variant="outlined" fullWidth />
      )}
    />
  </span>
);

export default FilterCell;
