/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

import ModelDetailsContainer from "../../model-details/ModelDetailsContainer";

export default class ModelDetailLinkColumn extends React.Component {

  constructor (props, context) {
    super(props, context);
    this.props = props;
    this.state = {
      open: false,
    };
    this.openModelDetail = this.openModelDetail.bind(this);
    this.closeModelDetail = this.closeModelDetail.bind(this);
  }

  openModelDetail (event) {
    event.preventDefault();
    this.setState({
      open: true
    });
  }

  closeModelDetail (event) {
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
        onClick={this.closeModelDetail}
        key='button'
      />
    ];

    return (
      <div>
        <a
          onClick={this.openModelDetail}
          style={{
            cursor: "pointer"
          }}
        >
          {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
          {this.props.className}{this.props.instanceName && `(${this.props.instanceName})`}
        </a>
        <Dialog
          title={this.props.className + " details"}
          actions={actions}
          modal
          contentStyle={this.props.customContentStyle}
          autoScrollBodyContent
          open={this.state.open}
        >
          <ModelDetailsContainer model={this.props.modelInstance} />
        </Dialog>
      </div>
    );
  }
}
