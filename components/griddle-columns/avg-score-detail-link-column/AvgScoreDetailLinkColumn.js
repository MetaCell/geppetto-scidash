import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import LockIcon from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';
import AvgScoreDetailsContainer from '../../avg-score-details/AvgScoreDetailsContainer';
import DialogActions from "@material-ui/core/DialogActions";
import CameraAltIcon from "@material-ui/icons/CameraAlt";

export default class ScidashAvgScoreDetailLinkColumn extends React.Component {
  constructor (props, context){
    super(props, context)
    this.props = props;
    this.openAvgScoreDetail = this.openAvgScoreDetail.bind(this);
    this.closeAvgScoreDetail = this.closeAvgScoreDetail.bind(this);
    this.state = { open: false, };
  }

  openAvgScoreDetail (e){
    e.preventDefault()
    this.setState({ open:true });
  }

  closeAvgScoreDetail (e){
    e.preventDefault()
    this.setState({ open:false });
  }

  render (){
    const actions = [
      <Button
        variant="contained"
        label="Save As Image"
        primary={true}
        onClick={e => {
          this.props.takeScreenshot(e)
        }}><CameraAltIcon />Save As Image</Button>,
      <Button
        variant="contained"
        label="Close"
        primary={true}
        onClick={this.closeAvgScoreDetail}
      >Close</Button>
    ];

    return (
      <div>
        <div style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: this.props.background,
          bottom: "0px",
          right: "12px"
        }}>
        </div>
        <div style={{
          textAlign: "right",
          position:"relative",
          right: "20px"
        }}>
          <a
            onClick={this.openAvgScoreDetail}
            style={{
              cursor: "pointer",
              color: "white"
            }}
          >{this.props.avgScore}</a>
          <Dialog
            maxWidth={false}
            open={this.state.open}
          >
            <AvgScoreDetailsContainer scoreList={this.props.scoreList} style={{ overflowY: "scroll" }} colorBlind={this.props.colorBlind}/>
            <DialogActions>
              {actions}
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}
