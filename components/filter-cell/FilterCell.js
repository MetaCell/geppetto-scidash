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
      options={autoCompleteData[columnId]}
      value={value}
      onInputChange={(event, value, reason) => onFilterUpdate(value, filterName)}
      renderInput={params => (
        <TextField {...params} label="" margin="normal" fullWidth />
      )}
    />
  </span>
);


export default FilterCell;
