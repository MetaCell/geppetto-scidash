/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import Chip from "material-ui/Chip";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import {red400, brown500} from 'material-ui/styles/colors';
import { Card, CardHeader, CardText } from "material-ui/Card";

export default class ModelViewDetails extends React.Component {

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

    var modelTags = [];
    for( var i=0; i < this.props.modelInstance.get("tags").size; i++) {
      modelTags.push(this.props.modelInstance.get("tags").get(i));
    }

    return (
      <div>
        <a
          onClick={this.openModelDetail}
          style={{
            cursor: "pointer"
          }}>
          {(this.props.modelInstance !== undefined) ? this.props.modelInstance.get("name") : undefined}
        </a>
        <Dialog
          title={ this.props.modelInstance.get("name") + " details"}
          actions={actions}
          modal
          contentStyle={this.props.customContentStyle}
          autoScrollBodyContent
          open={this.state.open}
        >


<Card>
    <CardText>
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
        ? this.props.modelInstance.get("modelClass").get("capabilities").map((item, index) => {
        return <div key={index}> {item.get("class_name")} </div> }) 
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
        {modelTags.map((tag, i) => 
        {
          return <Chip
              containerElement={'span'}
              backgroundColor={tag.toLowerCase() === "deprecated" ? red400 : brown500}
              style={{ 
                      marginTop: 6, 
                      marginBottom: 0,
                      whiteSpace: "nowrap",
                      display: "inline-block"
                    }}
              key={`${tag}-${i}`}>
              {tag}
          </Chip>
        }) }
      </p>
    </CardText>
  </Card>


          </Dialog>
      </div>
    );
  }
}
