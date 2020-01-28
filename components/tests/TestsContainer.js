import React from "react";
import { connect } from "react-redux";
import RaisedButton from "@material-ui/core/RaisedButton";
import { changePage } from "../../actions/creators/header";
import ScidashStorage from "../../shared/ScidashStorage";


import {
  filteringTestsStarted,
  dateFilterChanged,
  clearDateFilter,
  cloneTest,
  startEditTest
} from "../../actions/creators/tests";

import Tests from "./Tests";
import PagesService from "../../services/PagesService";
import { ActionVerifiedUser } from "@material-ui/core/svg-icons";

const mapStateToProps = state => ({
  styleConfig: {
    classNames: {
      Table: "table scidash-table",
      TableHeadingCell: "scidash-table-heading-cell"
    }
  },
  data: state.testInstances.data,
  autoCompleteData: state.testInstances.autoCompleteData,
  griddleComponents: {
    Filter: () => null,
    SettingsToggle: () => null,
    NextButton: props => {
      if (props.hasNext) {
        return (
          <RaisedButton
            label={props.text} onClick={props.getNext} style={{ marginLeft: "10px" }}
          />
        );
      }

      return null;
    },
    PreviousButton: props => {
      if (props.hasPrevious) {
        return (
          <RaisedButton
            label={props.text} onClick={props.getPrevious} style={{ marginRight: "10px" }}
          />
        );
      }

      return null;
    }
  },
  pageProperties: { currentPage: 1 },
  sortProperties: [{
    id: "_timestamp",
    sortAscending: false
  }],
  showLoading: state.scores.showLoading,
  user: state.user,
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
      dispatch(filteringTestsStarted(
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
  let pagesService = new PagesService();

  return {
    onFilterUpdate: (searchText, filterName) => {
      filter(searchText, filterName, dispatch);
    },
    onDateFilterClear: event => {
      dispatch(clearDateFilter(filter, dispatch));
    },
    clone: testId => dispatch(cloneTest(testId, dispatch)),
    edit: testId => dispatch(startEditTest(testId, dispatch)),
    toggleCreateTest: () => dispatch(changePage(pagesService.TESTS_CREATE_PAGE, dispatch)),
    notLoggedRedirect: () => dispatch(changePage(pagesService.SCORES_PAGE, dispatch))
  };
};

const TestsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tests);


export default TestsContainer;
