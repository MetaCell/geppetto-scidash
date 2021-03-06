import React from "react";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import Scores from "./Scores";
import ScidashStorage from "../../shared/ScidashStorage";
import _ from 'lodash';

import {
  filteringScoresStarted,
  updateScores,
  dateFilterChanged,
  clearDateFilter
} from "../../actions/creators/scores";

const mapStateToProps = state => ({
  data: state.scores.data,
  colorBlind: state.header.colorBlind,
  styleConfig: {
    classNames: {
      Table: "table scidash-table",
      TableHeadingCell: "scidash-table-heading-cell"
    }
  },
  autoCompleteData: state.scores.autoCompleteData,
  griddleComponents: {
    Filter: () => null,
    SettingsToggle: () => null,
    NextButton: props => {
      if (props.hasNext) {
        return (
          <RaisedButton
            label={props.text} 
            onClick={() => {
              props.getNext();
              window.scoreNextPage();
            }} 
            style={{
              marginLeft: "10px"
            }}
          />
        );
      }

      return null;
    },
    PreviousButton: props => {
      if (props.hasPrevious) {
        return (
          <RaisedButton
            label={props.text} 
            onClick={() => {
              props.getPrevious();
              window.scorePreviousPage();
            }} 
            style={{
              marginRight: "10px"
            }}
          />
        );
      }

      return null;
    },
    PageDropdown: props => {
      const getRange = (number) => {
        if (!_.isFinite(number)) { return [0] }
        return Array(number).fill().map((_, i) => i + 1);
      };
      const { currentPage, maxPages } = props;
      return (
        <select
          onChange={(e) => {
            props.setPage(e);
            window.setPage(e);
          }}
          value={currentPage}
          style={props.style}
          className={props.className}
        >
          {getRange(maxPages)
            .map(num => (
              <option key={num} value={num}>{num}</option>
          ))}
        </select>
      );
    }
  },
  pageProperties: {
    currentPage: 1
  },
  sortProperties: [{
    id: "_timestamp",
    sortAscending: false
  }],
  showLoading: state.scores.showLoading,
  dateFilterChanged: state.scores.dateFilterChanged,
  user: state.user,
});

const mapDispatchToProps = dispatch => {

  let filter = (searchText, filterName, dispatch, reset = false) => {
    let storage = new ScidashStorage();
    let timeoutKey = "lastFilterTimeoutId";

    if (storage.getItem(timeoutKey)) {
      clearTimeout(storage.getItem(timeoutKey));
      storage.setItem(timeoutKey, false);
    }

    let f = (searchText, filterName, dispatch) => {
      dispatch(filteringScoresStarted(
        searchText,
        filterName,
        dispatch
      ));
    };

    if (/^timestamp_.*/.test(filterName) && !reset) {
      dispatch(dateFilterChanged());
    }

    let timeoutId = setTimeout(f, 200, searchText, filterName, dispatch);
    storage.setItem(timeoutKey, timeoutId);
  };

  return {
    onFilterUpdate: (searchText, filterName) => {
      filter(searchText, filterName, dispatch);
    },
    updateScores: () => {
      dispatch(updateScores(dispatch));
    },
    onDateFilterClear: event => {
      dispatch(clearDateFilter(filter, dispatch));
    },
    sortScore: (data, column, sortAscending = true) => data.sort(
      (original, newRecord) => {
        original = (!!original.get("_sort_key") && original.get("_sort_key")) || "";
        newRecord = (!!newRecord.get("_sort_key") && newRecord.get("_sort_key")) || "";

        if (original === newRecord) {
          return 0;
        } else if (original > newRecord) {
          return sortAscending ? 1 : -1;
        } else {
          return sortAscending ? -1 : 1;
        }
      }),
  };
};

const ScoresContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Scores);


export default ScoresContainer;
