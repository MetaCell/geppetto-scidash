import React from 'react';
import { connect } from 'react-redux';
import TestInstances from './TestInstances'
import RaisedButton from 'material-ui/RaisedButton';
import ScidashStorage from '../../shared/ScidashStorage';
import ScoreApiService from '../../services/api/ScoreApiService';

import {
    filteringStarted,
    filteringFinished
} from '../../actions/creators/test-instances';

import {
    dateFilterChanged,
    clearDateFilter
} from '../../actions/creators/global';

const mapStateToProps = state => {
    return {
        data: state.testInstances.data,
        colorBlind: state.header.colorBlind,
        styleConfig: {
            classNames: {
                Table: 'table scidash-table',
                TableHeadingCell: 'scidash-table-heading-cell'
            }
        },
        autoCompleteData: state.testInstances.autoCompleteData,
        griddleComponents: {
            Filter: () => null,
            SettingsToggle: () => null,
            NextButton: (props) => {
                if (props.hasNext)
                    return <RaisedButton label={props.text} onClick={props.getNext} style={{
                        marginLeft: "10px"
                    }}/>;

                return null;
            },
            PreviousButton: (props) => {
                if (props.hasPrevious)
                    return <RaisedButton label={props.text} onClick={props.getPrevious} style={{
                        marginRight: "10px"
                    }}/>;

                return null;
            }
        },
        pageProperties: {
            currentPage: 1
        },
        sortScore: (data, column, sortAscending = true) => {
            return data.sort(
                (original, newRecord) => {
                    original = (!!original.get('_sort_key') && original.get('_sort_key')) || "";
                    newRecord = (!!newRecord.get('_sort_key') && newRecord.get('_sort_key')) || "";

                    if(original === newRecord) {
                        return 0;
                    } else if (original > newRecord) {
                        return sortAscending ? 1 : -1;
                    }
                    else {
                        return sortAscending ? -1 : 1;
                    }
                });
        },
        showLoading: state.testInstances.showLoading,
        dateFilterChanged: state.global.dateFilterChanged
    };
}

const mapDispatchToProps = dispatch => {

    let filter = (searchText, filterName, dispatch, reset = false) => {

        let storage = new ScidashStorage();
        let timeoutKey = 'lastFilterTimeoutId';

        if (storage.getItem(timeoutKey)){
            clearTimeout(storage.getItem(timeoutKey))
            storage.setItem(timeoutKey, false)
        }

        let f = (searchText, filterName, dispatch) => {
            dispatch(filteringStarted(
                searchText,
                filterName,
                dispatch
            ));
        }

        if (/^timestamp_.*/.test(filterName) && !reset){
            dispatch(dateFilterChanged());
        }

        let timeoutId = setTimeout(f, 200, searchText, filterName, dispatch);
        storage.setItem(timeoutKey, timeoutId);
    }

    return {
        onFilterUpdate: (searchText, filterName) =>  {
            filter(searchText, filterName, dispatch)
        },
        onDateFilterClear: (event) => {
            dispatch(clearDateFilter(filter, dispatch))
        }
    };
}

const TestInstancesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TestInstances)


export default TestInstancesContainer;
