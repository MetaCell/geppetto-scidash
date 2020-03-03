import React from "react";
import Button from "@material-ui/core/Button";

import ModelDetailsContainer from "../../model-details/ModelDetailsContainer";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";

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
        variant="contained"
        label="Close"
        onClick={this.closeModelDetail}
        key='button'
      >Close</Button>
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
          open={this.state.open}
          maxWidth="xl"
        >
          <DialogTitle>{this.props.className + " details"}</DialogTitle>
          <DialogContent>
            <ModelDetailsContainer model={this.props.modelInstance} />
          </DialogContent>
          <DialogActions>
            {actions}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
