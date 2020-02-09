import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { brown } from "@material-ui/core/colors";
import Griddle, { ColumnDefinition, RowDefinition, plugins } from "griddle-react";
import FilterCellContainer from "../filter-cell/FilterCellContainer";
import DateRangeCellContainer from "../date-range-cell/DateRangeCellContainer";
import Config from "../../shared/Config";
import Loader from "../loader/Loader";
import { CustomMenu, CustomTagComponent } from "./partial";
import _ from 'lodash';
import ModelViewDetailsContainer from "../griddle-columns/model-view-details/ModelViewDetailsContainer";
import FilteringService from "../../services/FilteringService";


export default class Models extends React.Component {

  constructor (props, context){
    super(props, context);
    this.props = props;

    this.griddleData = [];

    if (!props.user.isLogged) {
      this.props.notLoggedRedirect();
    }

    FilteringService.getInstance().setFromGLobalFilters( props.onFilterUpdate);

    /*
     * This will be removed - this.props.data needs to be refactored rom the
     * services/state/ScoreInitialEtc, the initial template must return an object for name
     * plus the backend part that needs to return the test instance object for the name.
     */
    for ( let i = 0; i < props.data.length; i++) {
      let griddleItem = _.clone(props.data[i]);
      let newItem = _.clone(props.data[i]);
      griddleItem.nameLink = props.data[i].name;
      for ( let j = 0; j < props.modelClasses.length; j++) {
        if (this.props.modelClasses[j].class_name === props.data[i].class) {
          griddleItem.modelClass = props.modelClasses[j];
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
      for ( var j = 0; j < this.props.modelClasses.length; j++) {
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
          hoveredStyle={{ backgroundColor: brown[400] }}
          style={{ float: "right", borderRadius: "40px", backgroundColor: brown[500] }}
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
                namespace={Config.globalNamespace}
                onFilterUpdate={this.props.onFilterUpdate}
                filterName="owner"
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
                namespace={Config.globalNamespace}
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
