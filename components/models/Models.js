import React from "react";
import IconButton from 'material-ui/IconButton';
import { brown500, brown400 } from 'material-ui/styles/colors';
import Griddle, { ColumnDefinition, RowDefinition, plugins } from "griddle-react";

import Loader from "../loader/Loader";

import { CustomMenu, CustomTagComponent } from './partial'

export default class Models extends React.Component {

  constructor(props, context){
    super(props, context);

    this.props = props;
  }

  render(){
    const { activateEditModel } = this.props;
    return (
      <div>
        <IconButton
          onClick={() => activateEditModel()}
          iconClassName="fa fa-plus"
          iconStyle={{ color: "white" }}
          hoveredStyle={{ backgroundColor: brown400 }}
          style={{ float: "right", borderRadius: "40px", backgroundColor: brown500 }}
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
              id="source"
              title="Source"
              customComponent={props => <a href={props.value} style={{color: "grey"}}><i className="fa fa-external-link"/></a>}
              order={3}
            />

            <ColumnDefinition
              id="tags"
              customComponent={props => <CustomTagComponent {...props} {...this.props}/>}
              title="Tags"
              order={4}
            />

            <ColumnDefinition
              id="owner"
              title="Owner"
              order={5}
            />

            <ColumnDefinition
              id="timestamp"
              title="Last edited"
              order={6}
            />

            <ColumnDefinition
              title=""
              id="block"
              customHeadingComponent={() => <span />}
              customComponent={props => <CustomMenu {...props} {...this.props}/>}
              order={7}
            />
          </RowDefinition>
        </Griddle>
        {this.props.showLoading ? <Loader /> : ""}
      </div>
    );
  }
}
