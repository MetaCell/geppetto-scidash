import React from "react";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import { Card, CardContent} from "@material-ui/core";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";

export default class ModelViewDetails extends React.Component {

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
        onClick={this.closeModelDetail}
        key='button'
      >Close</Button>
    ];

    var modelTags = [];
    for ( var i = 0; i < this.props.modelInstance.get("tags").size; i++) {
      modelTags.push(this.props.modelInstance.get("tags").get(i));
    }

    return (
      <div>
        <a
          onClick={this.openModelDetail}
          style={{ cursor: "pointer" }}>
          {(this.props.modelInstance !== undefined) ? this.props.modelInstance.get("name") : undefined}
        </a>
        <Dialog
          title={ this.props.modelInstance.get("name") + " details"}
          // contentStyle={this.props.customContentStyle}
          open={this.state.open}
          maxWidth={false}
        >

          <DialogTitle>
          {(this.props.modelInstance.get("class") !== undefined) 
            ? this.props.modelInstance.get("class") + " details"
            : "Model details"}
          </DialogTitle>

          <DialogContent>
            <Card style={{ overflow: "scroll", width: "calc(100vw - 25vw)" }} raised={true}>
              <CardContent>
                <strong>Class name: </strong>
                <div className="dialogText">
                  {(this.props.modelInstance.get("class") !== undefined)
                    ? this.props.modelInstance.get("class")
                    : undefined}
                </div>

                <p />
                <strong>Class source: </strong>
                <div className="dialogText">
                  {(this.props.modelInstance.get("modelClass") !== undefined) 
                    ? this.props.modelInstance.get("modelClass").get("import_path")
                    : undefined}
                </div>

                <p />
                <strong>Class capabilities:</strong>
                <div className="dialogText">
                  {(this.props.modelInstance.get("modelClass") !== undefined) 
                    ? this.props.modelInstance.get("modelClass").get("capabilities").map((item, index) => <div key={index}> {item.get("class_name")} </div>) 
                    : undefined}
                </div>

                <p />
                <strong>Instance name: </strong>
                <div className="dialogText">
                  {(this.props.modelInstance.get("name") !== undefined) 
                    ? this.props.modelInstance.get("name")
                    : undefined}
                </div>

                <p />
                <strong>Instance source: </strong>
                <div className="model-url dialogText">
                  <a target='_blank' className="model-url" href={this.props.modelInstance.get("source")}> 
                    {(this.props.modelInstance.get("source") !== undefined) 
                      ? this.props.modelInstance.get("source")
                      : undefined}
                  </a>
                </div>

                <p />
                <strong>Instance Tags: </strong>
                <div className="model-url dialogText">
                  {modelTags.map((tag, i) => <Chip
                    color={tag.toLowerCase() === "deprecated" ? "secondary" : "primary"}
                    style={{ 
                      marginTop: 6, 
                      marginBottom: 0,
                      whiteSpace: "nowrap"
                    }}
                    key={`${tag}-${i}`}
                    label={tag}
                  />) }
                </div>
              </CardContent>
            </Card>
          </DialogContent>

          <DialogActions>
            {actions}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
