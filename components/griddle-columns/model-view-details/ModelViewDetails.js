import React from "react";
import Chip from "@material-ui/core/Chip";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import { red, brown } from '@material-ui/core/colors';
import { Card, CardHeader, CardContent, DialogActions } from "@material-ui/core";

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


          <Card style={{ overflow: "scroll", width: "calc(100vw - 25vw)" }}>
            <CardContent>
              <p><strong>Class name: </strong>
                {(this.props.modelInstance.get("class") !== undefined) 
                  ? this.props.modelInstance.get("class")
                  : undefined}
              </p>
              <p><strong>Class source: </strong>
                {(this.props.modelInstance.get("modelClass") !== undefined) 
                  ? this.props.modelInstance.get("modelClass").get("import_path")
                  : undefined}
              </p>
              <p>
                <strong>
            Class capabilities:
                </strong>
                {(this.props.modelInstance.get("modelClass") !== undefined) 
                  ? this.props.modelInstance.get("modelClass").get("capabilities").map((item, index) => <div key={index}> {item.get("class_name")} </div>) 
                  : undefined}
              </p>
              <p><strong>Instance name: </strong>
                {(this.props.modelInstance.get("name") !== undefined) 
                  ? this.props.modelInstance.get("name")
                  : undefined}
              </p>
              <p className="model-url"><strong>Instance source: </strong>
                <a target='_blank' className="model-url" href={this.props.modelInstance.get("source")}> 
                  {(this.props.modelInstance.get("source") !== undefined) 
                    ? this.props.modelInstance.get("source")
                    : undefined}
                </a>
              </p>
              <p className="model-url"><strong>Instance Tags: </strong>
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
              </p>
            </CardContent>
          </Card>

          <DialogActions>
            {actions}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
