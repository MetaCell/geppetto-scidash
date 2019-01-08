import React from "react";
import IconButton from "material-ui/IconButton";
import { brown600, brown500 } from 'material-ui/styles/colors';
import Griddle, { ColumnDefinition, RowDefinition, plugins } from "griddle-react";

import Loader from "../loader/Loader";

import { CustomMenu, CustomTagComponent } from './partial'

export default class Tests extends React.Component {

  constructor(props, context){
    super(props, context);
    this.props = props;
  }

  render(){
    return (
      <div>
        <IconButton
          onClick={() => this.props.activateEditTest()}
          iconClassName="fa fa-plus"
          iconStyle={{ color: "white" }}
          hoveredStyle={{ backgroundColor: brown500 }}
          style={{ float: "right", borderRadius: "40px", backgroundColor: brown600 }}
        />

        <Griddle
          data={this.props.data}
          components={this.props.griddleComponents}
          plugins={[plugins.LocalPlugin]}
          styleConfig={this.props.styleConfig}
          pageProperties={this.props.pageProperties}
        >
          <RowDefinition>
            <ColumnDefinition
              id="name"
              title="Name"
              order={1}
            />

            <ColumnDefinition
              id="class"
              title="Class"
              order={2}
            />

            <ColumnDefinition
              id="tags"
              customComponent={props => <CustomTagComponent {...props} {...this.props}/>}
              title="Tags"
              order={3}
            />

            <ColumnDefinition
              id="owner"
              title="Owner"
              order={4}
            />

            <ColumnDefinition
              id="timestamp"
              title="Last edited"
              order={5}
            />

            <ColumnDefinition
              title=""
              id="block"
              customHeadingComponent={() => <span />}
              customComponent={props => <CustomMenu {...props} {...this.props}/>}
              order={6}
            />

            <ColumnDefinition
              isMetadata
              id="_timestamp"
              title="_timestamp"
            />
          </RowDefinition>
        </Griddle>
        {this.props.showLoading ? <Loader /> : ""}
      </div>
    );
  }
}
