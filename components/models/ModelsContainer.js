import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { changePage, changePageWithParams } from "../../actions/creators/header";
import ScidashStorage from "../../shared/ScidashStorage";
import {
  filteringModelsStarted,
  dateFilterChanged,
  clearDateFilter,
  cloneModel,
  startEditModel
} from "../../actions/creators/models";

import Models from "./Models";
import PagesService from "../../services/PagesService";

const mapStateToProps = state => ({
  styleConfig: {
    classNames: {
      Table: "table scidash-table",
      TableHeadingCell: "scidash-table-heading-cell"
    }
  },
  data: state.models.data,
  autoCompleteData: state.models.autoCompleteData,
  griddleComponents: {
    Filter: () => null,
    SettingsToggle: () => null,
    NextButton: props => {
      if (props.hasNext) {
        return (
          <Button
            variant="contained"
            label={props.text}
            onClick={props.getNext}
            style={{ marginLeft: "10px" }}
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
  scores: state.scores.data,
  modelClasses: state.modelClasses.data
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
      dispatch(filteringModelsStarted(
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

  let pagesService = new PagesService();

  return {
    onFilterUpdate: (searchText, filterName) => {
      filter(searchText, filterName, dispatch);
    },
    onDateFilterClear: event => {
      dispatch(clearDateFilter(filter, dispatch));
    },
    clone: modelId => dispatch(cloneModel(modelId, dispatch)),
    edit: modelId => dispatch(startEditModel(modelId, dispatch)),
    toggleCreateModel: () => dispatch(changePage(pagesService.MODELS_CREATE_PAGE, dispatch)),
    notLoggedRedirect: () => dispatch(changePage(pagesService.SCORES_PAGE, dispatch))
  };
};

const ModelsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Models);


export default ModelsContainer;
