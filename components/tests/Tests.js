import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { brown } from "@material-ui/core/colors";
import Griddle, { ColumnDefinition, RowDefinition, plugins } from "griddle-react";
import FilterCellContainer from "../filter-cell/FilterCellContainer";
import DateRangeCellContainer from "../date-range-cell/DateRangeCellContainer";
import Config from "../../shared/Config";
import Loader from "../loader/Loader";
import { CustomMenu, CustomTagComponent } from "./partial";
import FilteringService from "../../services/FilteringService";

export default class Tests extends React.Component {

  constructor (props, context){
    super(props, context);
    this.props = props;
    if (!props.user.isLogged) {
      this.props.notLoggedRedirect()
    }

    FilteringService.getInstance().setFromGLobalFilters( this.props.onFilterUpdate);
  }


  render (){
    return (
      <div>
        <IconButton
          onClick={() => this.props.toggleCreateTest()}
          iconClassName="fa fa-plus"
          hoveredStyle={{ backgroundColor: brown[500] }}
          style={{ float: "right", borderRadius: "40px", backgroundColor: brown[600] }}
        />

        <Griddle
          data={this.props.data}
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
              customHeadingComponent={props => (<FilterCellContainer
                autoCompleteData={this.props.autoCompleteData}
                namespace={Config.testInstancesNamespace}
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
                namespace={Config.testInstancesNamespace}
                onFilterUpdate={this.props.onFilterUpdate}
                filterName="class_name"
                {...props}
              />)}
              order={2}
            />

            <ColumnDefinition
              id="tags"
              customComponent={props => <CustomTagComponent {...props} {...this.props} />}
              title="Tags"
              customHeadingComponent={props => (<FilterCellContainer
                autoCompleteData={this.props.autoCompleteData}
                namespace={Config.testInstancesNamespace}
                onFilterUpdate={this.props.onFilterUpdate}
                filterName="tags"
                {...props}
              />)}
              order={3}
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
              order={4}
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
              order={5}
            />

            <ColumnDefinition
              title=""
              id="block"
              customHeadingComponent={() => <span />}
              customComponent={props => <CustomMenu {...props} {...this.props} />}
              order={6}
            />

            <ColumnDefinition
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
