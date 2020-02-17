import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import Button from '@material-ui/core/Button';
import ScreenShotHelper from '../../../shared/ScreenShotHelper';
import ScoreMatrixContainer from '../../score-matrix/ScoreMatrixContainer';
import DialogActions from "@material-ui/core/DialogActions";

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
      <Button
        key="snlcb-1"
        onClick={e => {
          this.screenShotHelper.takeScreenshot(e,"score_matrix_image",true)
        }}
      ><CameraAltIcon/>Save As Image
      </Button>,
      <Button
        key="snlcb-2"
        onClick={this.closeScoreMatrix}
      >Close</Button>
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
          open={this.state.open}
          maxWidth='xl'
          width="75%"
        >
          <ScoreMatrixContainer
            colorBlind={this.props.colorBlind}
            scoreMatrix={this.props.scoreMatrix}
            scoreMatrixTableData={this.props.scoreMatrixTableData}
            hiddenModels={this.props.hiddenModels}
            hideRow={this.props.hideRow}
            showAllModels={this.props.showAllModels}
          />
          <DialogActions>
            {actions}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}


