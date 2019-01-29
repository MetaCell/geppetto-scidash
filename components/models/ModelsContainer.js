import React from "react";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import { toggleCreateModel } from "../../actions/creators/header";
import ScidashStorage from "../../shared/ScidashStorage";

import {
  filteringModelsStarted,
  dateFilterChanged,
  clearDateFilter
} from "../../actions/creators/models";

import Models from "./Models";

const mapStateToProps = state => ({
  styleConfig: {
    classNames: {
      Table: "table scidash-table",
      TableHeadingCell: "scidash-table-heading-cell"
    }
  },
  data: state.models.data,
  autoCompleteData: { name: [], class: [], tags: [] },
  griddleComponents: {
    Filter: () => null,
    SettingsToggle: () => null,
    NextButton: props => {
      if (props.hasNext)
      {
        return (
          <RaisedButton
            label={props.text} 
            onClick={props.getNext} 
            style={{
              marginLeft: "10px"
            }}
          />
        );
      }

      return null;
    },
    PreviousButton: props => {
      if (props.hasPrevious)
      {return (
        <RaisedButton
          label={props.text} onClick={props.getPrevious} style={{
            marginRight: "10px"
          }}
        />
      );}

      return null;
    }
  },
  pageProperties: {
    currentPage: 1
  },
  showLoading: state.scores.showLoading,
});

const mapDispatchToProps = dispatch => {

  let filter = (searchText, filterName, dispatch, reset = false) => {
    let storage = new ScidashStorage();
    let timeoutKey = "lastFilterTimeoutId";

    if (storage.getItem(timeoutKey)){
      clearTimeout(storage.getItem(timeoutKey));
      storage.setItem(timeoutKey, false);
    }

    let f = (searchText, filterName, dispatch) => {
      dispatch(filteringModelsStarted(
        searchText,
        filterName,
        dispatch
      ));
    };

    if (/^timestamp_.*/.test(filterName) && !reset){
      dispatch(dateFilterChanged());
    }

    let timeoutId = setTimeout(f, 200, searchText, filterName, dispatch);
    storage.setItem(timeoutKey, timeoutId);
  };
  return {
    onFilterUpdate: (searchText, filterName) => {
      filter(searchText, filterName, dispatch);
    },
    onDateFilterClear: event => {
      dispatch(clearDateFilter(filter, dispatch));
    },

    toggleCreateModel: () => dispatch(toggleCreateModel())
  };
};

const ModelsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Models);


export default ModelsContainer;
