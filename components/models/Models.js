import React from "react";
import IconButton from "material-ui/IconButton";
import { brown500, brown400 } from "material-ui/styles/colors";
import Griddle, { ColumnDefinition, RowDefinition, plugins } from "griddle-react";
import FilterCellContainer from "../filter-cell/FilterCellContainer";
import DateRangeCellContainer from "../date-range-cell/DateRangeCellContainer";
import Config from "../../shared/Config";
import Loader from "../loader/Loader";
import { CustomMenu, CustomTagComponent } from "./partial";
import _ from 'lodash';
import ModelViewDetailsContainer from "../griddle-columns/model-view-details/ModelViewDetailsContainer";


export default class Models extends React.Component {

  constructor (props, context){
    super(props, context);
    this.props = props;

    this.username = this.props.user.isLogged ? this.props.user.userObject.username : "";
    this.griddleData = [];
  }

  componentWillMount () {
    if (this.props.user.isLogged) {
      this.props.onFilterUpdate(this.username, "owner");
    } else {
      this.props.notLoggedRedirect();
    }

    // This will be removed - this.props.data needs to be refactored rom the
    // services/state/ScoreInitialEtc, the initial template must return an object for name
    // plus the backend part that needs to return the test instance object for the name.
    for ( var i = 0; i < this.props.data.length; i++) {
      let griddleItem = _.clone(this.props.data[i]);
      let newItem = _.clone(this.props.data[i]);
      griddleItem.nameLink = this.props.data[i].name;
      for ( var j=0; j < this.props.modelClasses.length; j++) {
        if (this.props.modelClasses[j].class_name === this.props.data[i].class) {
          griddleItem.modelClass = this.props.modelClasses[j];
        }
      }
      newItem.name = griddleItem;
      this.griddleData.push(newItem);
    }
  }

  componentWillUpdate (nextProps, nextState) {
    this.griddleData = [];
    for ( var i = 0; i < nextProps.data.length; i++) {
      let griddleItem = _.clone(nextProps.data[i]);
      let newItem = _.clone(nextProps.data[i]);
      griddleItem.nameLink = nextProps.data[i].name;
      for ( var j=0; j < this.props.modelClasses.length; j++) {
        if (this.props.modelClasses[j].class_name === nextProps.data[i].class) {
          griddleItem.modelClass = nextProps.modelClasses[j];
        }
      }
      newItem.name = griddleItem;
      this.griddleData.push(newItem);
    }
  }

  render (){
    const { toggleCreateModel } = this.props;

    return (
      <div>
        <IconButton
          onClick={() => toggleCreateModel()}
          iconClassName="fa fa-plus"
          iconStyle={{ color: "white" }}
          hoveredStyle={{ backgroundColor: brown400 }}
          style={{ float: "right", borderRadius: "40px", backgroundColor: brown500 }}
        />
        <Griddle
          data={this.griddleData}
          components={this.props.griddleComponents}
          plugins={[plugins.LocalPlugin]}
          styleConfig={this.props.styleConfig}
          pageProperties={this.props.pageProperties}
          sortProperties={this.props.sortProperties}
        >
          <RowDefinition>
            <ColumnDefinition
              id="name"
              title="Name"
              customComponent={props => (
                <ModelViewDetailsContainer
                  {...props}
                />
              )}
              customHeadingComponent={props => (<FilterCellContainer
                autoCompleteData={this.props.autoCompleteData}
                namespace={Config.modelInstancesNamespace}
                onFilterUpdate={this.props.onFilterUpdate}
                filterName="name"
                {...props}
              />)}
              order={1}
            />

            <ColumnDefinition
              id="class"
              title="Class"
              customHeadingComponent={props => (<FilterCellContainer
                autoCompleteData={this.props.autoCompleteData}
                namespace={Config.modelInstancesNamespace}
                onFilterUpdate={this.props.onFilterUpdate}
                filterName="class_name"
                {...props}
              />)}
              order={2}
            />

            <ColumnDefinition
              id="source"
              title="Source"
              customComponent={props => {
                let inputString = props.value.replace(/\s/g, "");
                if (inputString !== "") {
                  return <a href={props.value} style={{ color: "grey" }}><i className="fa fa-external-link" /></a>;
                } else {
                  return <span />;
                }
              }
              }
              order={3}
            />

            <ColumnDefinition
              id="tags"
              customComponent={props => <CustomTagComponent {...props} {...this.props} />}
              title="Tags"
              customHeadingComponent={props => (<FilterCellContainer
                autoCompleteData={this.props.autoCompleteData}
                namespace={Config.modelInstancesNamespace}
                onFilterUpdate={this.props.onFilterUpdate}
                filterName="tags"
                {...props}
              />)}
              order={4}
            />

            <ColumnDefinition
              id="owner"
              title="Owner"
              customHeadingComponent={props => (<FilterCellContainer
                autoCompleteData={this.props.autoCompleteData}
                namespace={Config.modelInstancesNamespace}
                onFilterUpdate={this.props.onFilterUpdate}
                filterName="owner"
                value={this.username}
                {...props}
              />)}
              order={5}
            />

            <ColumnDefinition
              id="timestamp"
              title="Last edited"
              cssClassName="timeStampCss"
              customHeadingComponent={props => (<DateRangeCellContainer
                onFilterUpdate={this.props.onFilterUpdate}
                namespace={Config.modelInstancesNamespace}
                dateFilterChanged={this.props.dateFilterChanged}
                onDateFilterClear={this.props.onDateFilterClear}
                {...props}
              />)}
              order={6}
            />
            <ColumnDefinition
              isMetadata="true"
              id="_timestamp"
              title="_timestamp"
            />
            <ColumnDefinition
              title=""
              id="block"
              customHeadingComponent={() => <span />}
              customComponent={props => <CustomMenu {...props} {...this.props} />}
              order={7}
            />
          </RowDefinition>
        </Griddle>
        {this.props.showLoading ? <Loader /> : ""}
      </div>
    );
  }
}
