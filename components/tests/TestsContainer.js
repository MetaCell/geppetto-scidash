import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { activateEditTest } from "../../actions/creators/header";

import Tests from './Tests';

const mapStateToProps = state => {
  return {
      styleConfig: {
          classNames: {
              Table: 'table scidash-table',
              TableHeadingCell: 'scidash-table-heading-cell'
          }
      },
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
      showLoading: state.scores.showLoading,
  };
}

const mapDispatchToProps = dispatch => ({
  activateEditTest: () => dispatch(activateEditTest())
})

const TestsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tests)


export default TestsContainer;
