import React from "react";
import Button from "@material-ui/core/Button";
import TestDetailsContainer from "../../test-details/TestDetailsContainer";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";

export default class TestDetailLinkColumn extends React.Component {

  constructor (props, context) {
    super(props, context);
    this.props = props;
    this.state = { open: false, };
    this.openTestDetail = this.openTestDetail.bind(this);
    this.closeTestDetail = this.closeTestDetail.bind(this);
  }

  openTestDetail (event) {
    event.preventDefault();
    this.setState({ open: true });
  }

  closeTestDetail (event) {
    event.preventDefault();
    this.setState({ open: false });
  }


  render () {
    const actions = [
      <Button
        label="Close"
        variant="contained"
        onClick={this.closeTestDetail}
        key='button'
      >Close</Button>
    ];

    return (
      <div>
        <a
          onClick={this.openTestDetail}
          style={{ cursor: "pointer", }}
        >
          {this.props.testInstanceObject !== undefined && this.props.testInstanceObject !== " "
            ? this.props.testInstanceObject.get("test_class").get("class_name")
            : undefined}
        </a>
        <Dialog
          open={this.state.open}
          maxWidth={false}>

          <DialogTitle>
            Test details
          </DialogTitle>

          <DialogContent>
            <TestDetailsContainer testInstance={this.props.testInstanceObject} />
          </DialogContent>

          <DialogActions>
            {actions}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
