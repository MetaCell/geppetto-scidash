import React from "react";
import Chip from "@material-ui/core/Chip";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import { Card, CardContent, DialogActions } from "@material-ui/core";
import { red, brown } from '@material-ui/core/colors';
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
        primary
        onClick={this.closeDialog}
      >Close</Button>,
    ];

    return (
      <Dialog
        maxWidth={false}
        open={this.props.dialogOpened}
      >
        <div style={{ minWidth: "100px", margin: "15px" }}>
          <h4 style={{ maxWidth: "360px" }}>{instanceSource !== "None" ? "Model" : "Test"}{" details"}</h4>
          <Card>
            <CardContent>
              <p><strong>Name: </strong>
                {instanceName}
              </p>
              <p><strong>Class: </strong>
                {instanceClassName}
              </p>
              <p><strong>Owner: </strong>
                {instanceOwner}
              </p>
              {instanceSource !== "None"
                ? <p><strong>Source: </strong>
                  <a target='_blank' className="model-url" href={instanceSource}> {instanceSource}</a>
                </p> : undefined}
              <p><strong>Timestamp: </strong>
                {instanceTimestamp}
              </p>
              <p><strong>Tags: </strong>
                <span style={{ display: "flex" }}>
                  {instanceTags === "None" ? undefined : instanceTags.map((tag, i) =>
                    <Chip
                      containerElement={'span'}
                      color={tag.toLowerCase() === "deprecated" ? "secondary" : "primary"}
                      style={{ marginTop: 6, marginBottom: 0 }}
                      key={`${tag}-${i}`}
                      label={tag}
                    />
                  )}
                </span>
              </p>
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
