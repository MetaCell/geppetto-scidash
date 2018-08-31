import { connect } from 'react-redux';
import FilterCell from './FilterCell';


const mapStateToProps = (state, ownProps) => {
    return {
        title: ownProps.title,
        icon: ownProps.icon,
        value: null,
        styleDefault: {
            width: "100px",
            height: "28px",
            marginRight: "5px"
        },
        menuStyle: {
            width: "180px"
        },
        listStyle: {
            width: "180px"
        },
        styleInputDefault: {
            width: "100px",
            height: "28px",
            border: "1px solid #ccc"
        },
        autoCompleteData: ownProps.autoCompleteData,
        columnId: ownProps.columnId,
        filterName: ownProps.filteName,
        onFilterUpdate: ownProps.onFilterUpdate
    }
}

const mapDispatchToProps = (dispatch) => {
    return { }
}

const FilterCellContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterCell)


export default FilterCellContainer;
