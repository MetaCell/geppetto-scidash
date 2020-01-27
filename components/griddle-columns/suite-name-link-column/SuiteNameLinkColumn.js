import React from 'react';
import Dialog from 'material-ui/Dialog';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import ScreenShotHelper from '../../../shared/ScreenShotHelper';
import ScoreMatrixContainer from '../../score-matrix/ScoreMatrixContainer';

export default class ScidashSuiteNameLinkColumn extends React.Component {
  constructor (props, context){
    super(props, context)
    this.props = props;
    this.openScoreMatrix = this.openScoreMatrix.bind(this);
    this.closeScoreMatrix = this.closeScoreMatrix.bind(this);
    this.state = { open: false };
    this.screenShotHelper = new ScreenShotHelper();
  }

  openScoreMatrix (e){
    e.preventDefault()
    this.setState({ open:true });
  }

  closeScoreMatrix (e){
    e.preventDefault()
    this.setState({ open:false });
  }

  render (){
    const actions = [
      <FlatButton
        label="Save As Image"
        primary={true}
        icon={<FontIcon className="fa fa-camera"/>}
        onClick={e => {
          this.screenShotHelper.takeScreenshot(e,"score_matrix_image",true)
        }}
      />,
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.closeScoreMatrix}
      />
    ];

    return (
      <div>
        <a
          onClick={this.openScoreMatrix}
          style={{
            cursor: "pointer",
            wordWrap: "break-word",
            paddingRight: "20px"
          }}
        >{ this.props.value != " " && this.props.value.get("name") }</a>
        <Dialog
          actions={actions}
          modal={true}
          autoScrollBodyContent={true}
          contentStyle={{
            width: "75%",
            maxWidth: "none"
          }}
          contentClassName="centered-modal"
          open={this.state.open}
        >
          <ScoreMatrixContainer
            colorBlind={this.props.colorBlind}
            scoreMatrix={this.props.scoreMatrix}
            scoreMatrixTableData={this.props.scoreMatrixTableData}
            hiddenModels={this.props.hiddenModels}
            hideRow={this.props.hideRow}
            showAllModels={this.props.showAllModels}
          />
        </Dialog>
      </div>
    );
  }
}


