import React from "react";
import Chip from "material-ui/Chip";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import { Card, CardText } from "material-ui/Card";
import { red400, brown500 } from 'material-ui/styles/colors';
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
      <FlatButton
        label="Close"
        primary
        onClick={this.closeDialog}
      />,
    ];

    return (
      <Dialog
        actions={actions}
        modal
        autoScrollBodyContent
        contentStyle={{
          width: "75%",
          maxWidth: "none"
        }}
        contentClassName="centered-modal"
        open={this.props.dialogOpened}
      >
        <div style={{ minWidth: "100px", margin: "15px" }}>
          <h4 style={{ maxWidth: "360px" }}>{instanceSource !== "None" ? "Model" : "Test"}{" details"}</h4>
          <Card>
            <CardText>
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
                      backgroundColor={tag.toLowerCase() === "deprecated" ? red400 : brown500}
                      style={{ marginTop: 6, marginBottom: 0 }}
                      key={`${tag}-${i}`}>
                      {tag}
                    </Chip>
                  )}
                </span>
              </p>
            </CardText>
          </Card>
        </div>
      </Dialog>
    );
  }
}
