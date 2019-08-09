/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import TestDetailsContainer from "../../test-details/TestDetailsContainer";

export default class TestDetailLinkColumn extends React.Component {

  constructor (props, context) {
    super(props, context);
    this.props = props;
    this.state = {
      open: false,
    };
    this.openTestDetail = this.openTestDetail.bind(this);
    this.closeTestDetail = this.closeTestDetail.bind(this);
  }

  openTestDetail (event) {
    event.preventDefault();
    this.setState({
      open: true
    });
  }

  closeTestDetail (event) {
    event.preventDefault();
    this.setState({
      open: false
    });
  }


  render () {
    const actions = [
      <FlatButton
        label="Close"
        primary
        onClick={this.closeTestDetail}
        key='button'
      />
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
            onClick={this.openTestDetail}
            style={{
              cursor: "pointer",
            }}
          >
            {this.props.testInstanceObject.get("test_class").get("class_name")}
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
            <TestDetailsContainer testInstance={this.props.testInstanceObject} />
          </Dialog>
        </div>
      </div>
    );
  }
}
