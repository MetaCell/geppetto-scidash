import React from 'react';
import { connect } from 'react-redux';
import TestInstances from './TestInstances'
import RaisedButton from 'material-ui/RaisedButton';

const mapStateToProps = state => {
    return {
        data: state.testInstances.data,
        filters: {},
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
        }
    };
}

const mapDispatchToProps = dispatch => {
    return {
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
        onFilterUpdate: (searchText, filterName) =>  {
            dispatch({
                type: 'FILTER_UPDATED',
                filterName,
                searchText
            })
        }
    };
}

const TestInstancesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TestInstances)


export default TestInstancesContainer;
