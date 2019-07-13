/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import ScoreDetailsContainer from "../../score-details/ScoreDetailsContainer";


export default class ScoreDetailLinkColumn extends React.Component {

  constructor (props, context) {
    super(props, context);
    this.props = props;

    this.openScoreDetail = this.openScoreDetail.bind(this);
    this.closeScoreDetail = this.closeScoreDetail.bind(this);

    this.state = {
      open: false,
    };
  }

  openScoreDetail (e) {
    e.preventDefault();
    this.setState({
      open: true
    });
  }

  closeScoreDetail (e) {
    e.preventDefault();
    this.setState({
      open: false
    });
  }

  getScore (){
    return this.props.score || "";
  }

  render () {
    const actions = [
      <FlatButton
        label="Close"
        primary
        onClick={this.closeScoreDetail}
      />,
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
            actions={actions}
            modal
            autoScrollBodyContent
            contentStyle={{
              width: "75%",
              maxWidth: "none"
            }}
            contentClassName="centered-modal"
            open={this.state.open}
          >
            <ScoreDetailsContainer score={this.props.scoreObject} colorBlind={this.props.colorBlind} />
          </Dialog>
        </div>
      </div>
    );
  }
}
