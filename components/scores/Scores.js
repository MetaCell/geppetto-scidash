import React from "react";
import Griddle, {
  ColumnDefinition,
  RowDefinition,
  plugins
} from "griddle-react";

import FilterCellContainer from "../filter-cell/FilterCellContainer";
import ScoreDetailLinkColumnContainer from "../griddle-columns/score-detail-link-column/ScoreDetailLinkColumnContainer";
import ModelDetailLinkColumnContainer from "../griddle-columns/model-detail-link-column/ModelDetailLinkColumnContainer";
import DateRangeCellContainer from "../date-range-cell/DateRangeCellContainer";
import Config from "../../shared/Config";

import {
  CustomScoreName,
  ScidashBuildInfoColumn,
  ScidashTimestampColumn,
  StatusIconColumn
} from "./partials";

import Loader from "../loader/Loader";
import SelectCellContainer from "../select-cell/SelectCellContainer";

export default class Scores extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.props = props;
    this.username = this.props.user.isLogged
      ? this.props.user.userObject.username
      : "";

    this.state = {
      intervalId: null,
      page: 1
    };

    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  componentWillMount() {
    if (this.props.user.isLogged) {
      this.props.onFilterUpdate(this.username, "owner");
    }
    if (this.state.intervalId === null) {
      this.setState({
        intervalId: setInterval(this.props.updateScores, 5000)
      });
    }
  }

  componentDidMount() {
    window.scoreNextPage = this.nextPage;
    window.scorePreviousPage = this.previousPage;
  }

  componentWillUnmount() {
    if (this.state.intervalId !== null) {
      clearInterval(this.state.intervalId);
    }
  }

  render() {
    let pageProperties = this.props.pageProperties;
    pageProperties.currentPage = this.state.page;
    return (
      <div>
        <Griddle
          data={this.props.data}
          components={this.props.griddleComponents}
          plugins={[plugins.LocalPlugin]}
          styleConfig={this.props.styleConfig}
          pageProperties={pageProperties}
          sortProperties={this.props.sortProperties}
          events={{
            onNext: () => {
              this.setState({ page: this.state.page + 1 });
            },
            onPrevious: () => {
              this.setState({ page: this.state.page - 1 });
            }
          }}
        >
          <RowDefinition>
            <ColumnDefinition
              id="name"
              title="Name"
              customComponent={CustomScoreName}
              customHeadingComponent={props => (
                <FilterCellContainer
                  autoCompleteData={this.props.autoCompleteData}
                  namespace={Config.instancesNamespace}
                  onFilterUpdate={this.props.onFilterUpdate}
                  filterName="name"
                  {...props}
                />
              )}
              order={1}
            />
            <ColumnDefinition
              id="score"
              title="Score"
              sortMethod={this.props.sortScore}
              customComponent={props => (
                <ScoreDetailLinkColumnContainer
                  colorBlind={this.props.colorBlind}
                  {...props}
                />
              )}
              order={2}
            />
            <ColumnDefinition
              id="_sort_key"
              title="_sort_key"
              isMetadata="true"
            />
            <ColumnDefinition
              id="score_type"
              title="Score Type"
              customHeadingComponent={props => (
                <FilterCellContainer
                  autoCompleteData={this.props.autoCompleteData}
                  namespace={Config.instancesNamespace}
                  onFilterUpdate={this.props.onFilterUpdate}
                  filterName="score_type"
                  {...props}
                />
              )}
              order={3}
            />
            <ColumnDefinition
              id="model"
              title="Model"
              sortMethod={this.sortModel}
              customComponent={ModelDetailLinkColumnContainer}
              customHeadingComponent={props => (
                <FilterCellContainer
                  autoCompleteData={this.props.autoCompleteData}
                  namespace={Config.instancesNamespace}
                  onFilterUpdate={this.props.onFilterUpdate}
                  filterName="model"
                  {...props}
                />
              )}
              order={6}
            />
            <ColumnDefinition
              id="hostname"
              title="Hostname"
              customHeadingComponent={props => (
                <FilterCellContainer
                  autoCompleteData={this.props.autoCompleteData}
                  namespace={Config.instancesNamespace}
                  onFilterUpdate={this.props.onFilterUpdate}
                  filterName="hostname"
                  {...props}
                />
              )}
              order={7}
            />
            <ColumnDefinition
              id="owner"
              title="Owner"
              customHeadingComponent={props => (
                <FilterCellContainer
                  autoCompleteData={this.props.autoCompleteData}
                  namespace={Config.instancesNamespace}
                  onFilterUpdate={this.props.onFilterUpdate}
                  filterName="owner"
                  value={this.username}
                  {...props}
                />
              )}
              order={8}
            />
            <ColumnDefinition
              id="build_info"
              title="Build Info"
              customComponent={ScidashBuildInfoColumn}
              customHeadingComponent={props => (
                <FilterCellContainer
                  autoCompleteData={this.props.autoCompleteData}
                  namespace={Config.instancesNamespace}
                  onFilterUpdate={this.props.onFilterUpdate}
                  filterName="build_info"
                  {...props}
                />
              )}
              order={9}
            />
            <ColumnDefinition
              id="status"
              title="Status"
              customComponent={StatusIconColumn}
              customHeadingComponent={props => (
                <SelectCellContainer
                  onFilterUpdate={this.props.onFilterUpdate}
                  filterName="status"
                  namespace={Config.instancesNamespace}
                  {...props}
                />
              )}
              order={10}
            />
            <ColumnDefinition
              id="timestamp"
              sortMethod={this.sortTimestamp}
              title="Timestamp"
              width="100px"
              customComponent={ScidashTimestampColumn}
              customHeadingComponent={props => (
                <DateRangeCellContainer
                  onFilterUpdate={this.props.onFilterUpdate}
                  namespace={Config.instancesNamespace}
                  dateFilterChanged={this.props.dateFilterChanged}
                  onDateFilterClear={this.props.onDateFilterClear}
                  {...props}
                />
              )}
              order={11}
            />
            <ColumnDefinition
              isMetadata="true"
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
