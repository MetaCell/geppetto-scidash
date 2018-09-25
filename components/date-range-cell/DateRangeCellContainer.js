import { connect } from "react-redux";
import DateRangeCell from "./DateRangeCell";
import Helper from "../../shared/Helper";
import ScoreApiService from "../../services/api/ScoreApiService";


const mapStateToProps = (state, ownProps) => {

    let currentFilters = new ScoreApiService().getFilters();
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
        changed: false,
        title: ownProps.title,
        icon: ownProps.icon,
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
        value,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearFilter: () => {
            console.log("Hi");
        },
        stopPropagation: (event) => {
            event.stopPropagation()
        },
        onChange: (event, date) => {
            console.log("ON DATE RANGE CHANGE");
        }
    }
}


const DateRangeCellContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DateRangeCell)


export default DateRangeCellContainer;
