import { connect } from "react-redux";
import SelectCell from "./SelectCell";
import FilteringService from "../../services/FilteringService";

const mapStateToProps = (state, ownProps) => {
  let namespace = ownProps.namespace;
  let currentFilters = FilteringService.getInstance().getFilters(namespace, true);
  let filterName = ownProps.filterName;
  let value = "";

  if (filterName in currentFilters) value = currentFilters[filterName];
  else value = "";

  return {
    title: ownProps.title,
    icon: ownProps.icon,
    styleDefault: {
      width: "100px",
      height: "28px",
      marginRight: "5px",
    },
    columnId: ownProps.columnId,
    onFilterUpdate: ownProps.onFilterUpdate,
    value,
    filterName,
    currentFilters,
  };
};

const mapDispatchToProps = dispatch => ({});

const SelectCellContainer = connect(mapStateToProps, mapDispatchToProps)(
  SelectCell
);

export default SelectCellContainer;
