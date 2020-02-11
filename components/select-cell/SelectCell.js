import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Config from "../../shared/Config";

const SelectCell = ({
  title,
  icon,
  value,
  filterName,
  styleDefault,
  onFilterUpdate
}) => (
  <span>
    <p>
      {title}
      {icon}
    </p>
    <Select
      value={value}
      style={styleDefault}
      onClick={event => {
        event.stopPropagation();
      }}
      onChange={(event) => onFilterUpdate(event.target.value, filterName)}
    >
      <MenuItem value="">
          All
      </MenuItem>
      {Object.keys(Config.scoreStatusMap).map((value, index) => (
        <MenuItem value={value} key={value}>
          {Config.scoreStatusMap[value]}
        </MenuItem>
      ))}
    </Select>
  </span>
);

export default SelectCell;

let styles = {
  firstLine: {
    two: { flex: 2 },
    icon: { background: "#000", padding: "0px", width: "auto", height: "auto" }
  }
};
