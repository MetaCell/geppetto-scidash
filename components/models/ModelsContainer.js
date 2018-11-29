import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { activateEditModel } from '../../actions/creators/header';

import Models from './Models';

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
      showLoading: state.testInstances.showLoading,
  };
}

const mapDispatchToProps = dispatch => ({
  activateEditModel: () => dispatch(activateEditModel())
})

const ModelsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Models)


export default ModelsContainer;