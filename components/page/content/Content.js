import React from 'react';
import TestInstancesContainer from '../../test-instances/TestInstancesContainer';
import TestSuitesContainer from '../../test-suites/TestSuitesContainer';
import PagesService from '../../../services/PagesService';


import TestsContainer from '../../tests/TestsContainer';
import ModelsContainer from '../../models/ModelsContainer';
import Settings from '../../settings/Settings';
import SchedulingContainer from '../../scheduling/SchedulingContainer';

export default class Content extends React.Component {

    constructor(props, context){
        super(props, context);

        this.props = props;
    }

    render() {
        let pagesService = new PagesService()        
        
        if (this.props.activePage == pagesService.SCORES_PAGE && this.props.activeView == pagesService.TESTS_VIEW)
            return (
                <TestInstancesContainer />
            )

        if (this.props.activePage == pagesService.SCORES_PAGE && this.props.activeView == pagesService.SUITES_VIEW)
            return (
                <TestSuitesContainer />
            )

        if (this.props.activePage == pagesService.MODELS_PAGE)
            return (
                <ModelsContainer />
            )
        
        if (this.props.activePage == pagesService.TESTS_PAGE)
            return (
                <TestsContainer />
            )
        
        if (this.props.activePage == pagesService.SETTINGS_PAGE)
            return (
                <Settings/>
            )

        if (this.props.activePage == pagesService.SCHEDULING_PAGE)
            return (
                <SchedulingContainer />
            )
    }
}

