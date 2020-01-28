import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";

import ModelDetailsContainer from "../../model-details/ModelDetailsContainer";

export default class ModelDetailLinkColumn extends React.Component {

  constructor (props, context) {
    super(props, context);
    this.props = props;
    this.state = { open: false, };
    this.openModelDetail = this.openModelDetail.bind(this);
    this.closeModelDetail = this.closeModelDetail.bind(this);
  }

  openModelDetail (event) {
    event.preventDefault();
    this.setState({ open: true });
  }

  closeModelDetail (event) {
    event.preventDefault();
    this.setState({ open: false });
  }


  render () {
    const actions = [
      <Button
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
          style={{ cursor: "pointer" }}
        >
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
