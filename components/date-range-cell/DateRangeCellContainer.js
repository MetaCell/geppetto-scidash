import { connect } from "react-redux";
import DateRangeCell from "./DateRangeCell";
import Helper from "../../shared/Helper";
import FilteringService from "../../services/FilteringService";


const mapStateToProps = (state, ownProps) => {

    let namespace = ownProps.namespace;
    let currentFilters = FilteringService.getInstance().getFilters(namespace, true);
    let cfl = new Helper().capitalizeFirstLetter;

    let names = ["from",  "to"];
    let filterNameBase = "timestamp_";
    let value = {};

    for (let name of names){
        let filterName = filterNameBase + name;

        if(filterName in currentFilters)
            value[name] = new Date(currentFilters[filterName]);
    }

    return {
        changed: ownProps.dateFilterChanged,
        title: ownProps.title,
        icon: ownProps.icon,
        filterNameFrom: filterNameBase + names[0],
        filterNameTo: filterNameBase + names[1],
        styleTextField: {
            width: "80px",
            borderRadius: "0px",
            height: "28px",
            border: "1px solid #ccc",
            backgroundColor: "rgba(0, 0, 0, 0)",
            fontSize:"13px",
            fontWeight:"normal",
            padding: "0px 0px 0px 3px"
        },
        styleWrapper: {
            margin: "0px 1px 0px 0px"
        },
        onFilterUpdate: ownProps.onFilterUpdate,
        onDateFilterClear: ownProps.onDateFilterClear,
        value,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        stopPropagation: (event) => {
            event.stopPropagation()
        }
    }
}


const DateRangeCellContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DateRangeCell)


export default DateRangeCellContainer;
