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
      underlineStyle={{ borderBottom: "1px solid #ccc", bottom: "0px" }}
      style={styleDefault}
      iconStyle={styles.firstLine.icon}
      labelStyle={{
        fontWeight: "normal",
        fontSize: "12px",
        top: "-14px"
      }}
      menuStyle={{ width: "105px" }}
      menuItemStyle={{ fontSize: "12px" }}
      onClick={event => {
        event.stopPropagation();
      }}
      onChange={(event, key, value) => onFilterUpdate(value, filterName)}
    >
      <MenuItem value="" primaryText="All" />
      {Object.keys(Config.scoreStatusMap).map((value, index) => (
        <MenuItem
          value={value}
          key={value}
          primaryText={Config.scoreStatusMap[value]}
        />
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
