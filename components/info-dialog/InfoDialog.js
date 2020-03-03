import React from "react";
import Chip from "@material-ui/core/Chip";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import { Card, CardContent, DialogActions } from "@material-ui/core";
import Helper from "../../shared/Helper";

export default class InfoDialog extends React.Component {

  constructor (props, context) {
    super(props, context);
    this.props = props;

    this.closeDialog = this.closeDialog.bind(this);
  }

  closeDialog () {
    this.props.closeDialog();
  }

  render () {
    let helper = new Helper();

    const instanceClassName = helper.noneIfEmptyString(this.props.instance.class);
    const instanceId = helper.noneIfEmptyString(this.props.instance.id);
    const instanceOwner = helper.noneIfEmptyString(this.props.instance.owner);
    const instanceName = helper.noneIfEmptyString(this.props.instance.name);
    const instanceSource = helper.noneIfEmptyString(this.props.instance.source);
    const instanceTimestamp = helper.noneIfEmptyString(this.props.instance.timestamp);
    const instanceTags = helper.noneIfEmptyString(this.props.instance.tags);
        
    const actions = [
      <Button
        label="Close"
        variant="contained"
        onClick={this.closeDialog}
      >Close</Button>,
    ];

    return (
      <Dialog
        open={this.props.dialogOpened}
        maxWidth={false}
      >
        <div style={{ minWidth: "100px", margin: "15px" }}>
          <h4 style={{ maxWidth: "360px" }}>{instanceSource !== "None" ? "Model" : "Test"}{" details"}</h4>
          <Card>
            <CardContent>
              <p />
              <strong className="dialogTitle">Name: </strong>
              <div className="dialogText">
                {instanceName}
              </div>

              <p />
              <strong className="dialogTitle">Class: </strong>
              <div className="dialogText">
                {instanceClassName}
              </div>

              <p />
              <strong className="dialogTitle">Owner: </strong>
              <div className="dialogText">
                {instanceOwner}
              </div>

              {(instanceSource !== "None")
                ? (<span>
                    <p />
                    <strong className="dialogTitle">Source: </strong>
                    <div className="dialogText">
                      <a target='_blank' className="model-url" href={instanceSource}> {instanceSource} </a>
                    </div>
                  </span>)
                : undefined}

              <p />
              <strong className="dialogTitle">Timestamp: </strong>
              <div className="dialogText">
                {instanceTimestamp}
              </div>

              <p />
              <strong className="dialogTitle">Tags: </strong>
              <span style={{ display: "flex" }}>
                {instanceTags === "None" ? undefined : instanceTags.map((tag, i) =>
                  <Chip
                    color={tag.toLowerCase() === "deprecated" ? "secondary" : "primary"}
                    style={{ marginTop: 6, marginBottom: 0 }}
                    key={`${tag}-${i}`}
                    label={tag}
                  />
                )}
              </span>

            </CardContent>
          </Card>
        </div>
        <DialogActions>
          {actions}
        </DialogActions>
      </Dialog>
    );
  }
}
