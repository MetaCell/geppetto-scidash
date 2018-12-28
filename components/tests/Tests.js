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
          data={fakeData.data}
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


const fakeData = {
  data: [
    { id: 1, name: "test1", class: "class1", tags: ["tag1", "tag2", "deprecated"], owner: "owner1", timestamp: new Date().toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), block: false },
    { id: 1, name: "test1", class: "class1", tags: ["tag1", "tag2", "deprecated"], owner: "owner1", timestamp: new Date().toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), block: false },
    { id: 2, name: "test2", class: "class2", tags: ["tag4", "deprecated", "tag6"], owner: "owner2", timestamp: new Date().toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), block: false },
    { id: 3, name: "test3", class: "class3", tags: ["tag7", "tag8", "tag9"], owner: "owner3", timestamp: new Date().toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), block: true },
    { id: 4, name: "test4", class: "class4", tags: ["deprecated", "tag2", "tag1"], owner: "owner4", timestamp: new Date().toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), block: false },
    { id: 5, name: "test5", class: "class5", tags: ["tag5", "tag2", "tag3"], owner: "owner5", timestamp: new Date().toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), block: true },
    { id: 6, name: "test6", class: "class6", tags: ["tag6", "deprecated", "tag3"], owner: "owner6", timestamp: new Date().toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), block: false }
  ],
  autocomplete: {
    name: Array(6).map((v, i) => "test" + i + 1),
    tags: [...Array(6).map((v, i) => "tag" + i + 1), "deprecated"],
    class: Array(6).map((v, i) => "class" + i + 1),
    owner: Array(6).map((v, i) => "owner" + i + 1),
    timestamp: [],
    _timestamp: [],
  },
}
