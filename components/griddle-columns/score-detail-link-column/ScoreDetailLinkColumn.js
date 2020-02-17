import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import ScoreDetailsContainer from "../../score-details/ScoreDetailsContainer";
import DialogActions from "@material-ui/core/DialogActions";


export default class ScoreDetailLinkColumn extends React.Component {

  constructor (props, context) {
    super(props, context);
    this.props = props;

    this.openScoreDetail = this.openScoreDetail.bind(this);
    this.closeScoreDetail = this.closeScoreDetail.bind(this);

    this.state = { open: false, };
  }

  openScoreDetail (e) {
    e.preventDefault();
    this.setState({ open: true });
  }

  closeScoreDetail (e) {
    e.preventDefault();
    this.setState({ open: false });
  }

  getScore (){
    return this.props.score || "";
  }

  render () {
    const actions = [
      <Button
        label="Close"
        variant="contained"
        onClick={this.closeScoreDetail}
        key='button'
      >Close</Button>,
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
        }}
        />
        <div style={{
          textAlign: "center",
          position: "relative",
          right: "20px"
        }}
        >
          <a
            onClick={this.openScoreDetail}
            style={{
              cursor: "pointer",
              color: "white",
              paddingLeft: "17px"
            }}
          >
            {this.getScore()}
          </a>
          <Dialog
            open={this.state.open}
            maxWidth={false}
          >
            <ScoreDetailsContainer score={this.props.scoreObject} colorBlind={this.props.colorBlind}/>
            <DialogActions>
              {actions}
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}
