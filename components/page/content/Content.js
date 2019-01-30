import React from "react";
import ScoresContainer from "../../scores/ScoresContainer";
import TestSuitesContainer from "../../test-suites/TestSuitesContainer";
import PagesService from "../../../services/PagesService";
import Settings from "../../settings/Settings";
import ModelsContainer from "../../models/ModelsContainer";
import ModelCreateContainer from "../../model-create/ModelCreateContainer";
import TestsContainer from "../../tests/TestsContainer";
import TestCreateContainer from "../../test-create/TestCreateContainer";
import SchedulingContainer from "../../scheduling/SchedulingContainer";

export default class Content extends React.Component {

  constructor (props, context) {
    super(props, context);

    this.props = props;
  }

  render () {
    let pagesService = new PagesService();

    if (this.props.activePage == pagesService.SCORES_PAGE && this.props.activeView == pagesService.TESTS_VIEW) {
      return (
        <ScoresContainer />
      );
    }

    if (this.props.activePage == pagesService.SCORES_PAGE && this.props.activeView == pagesService.SUITES_VIEW) {
      return (
        <TestSuitesContainer />
      );
    }

    if (this.props.activePage == pagesService.MODELS_PAGE && this.props.createModelActive) {
      return (
        <ModelCreateContainer />
      );
    }

    if (this.props.activePage == pagesService.MODELS_PAGE) {
      return (
        <ModelsContainer />
      );
    }

    if (this.props.activePage == pagesService.TESTS_PAGE && this.props.createTestActive) {
      return (
        <TestCreateContainer />
      );
    }

    if (this.props.activePage == pagesService.TESTS_PAGE) {
      return (
        <TestsContainer />
      );
    }

    if (this.props.activePage == pagesService.SETTINGS_PAGE) {
      return (
        <Settings />
      );
    }

    if (this.props.activePage == pagesService.SCHEDULING_PAGE) {
      return (
        <SchedulingContainer />
      );
    }
  }
}
