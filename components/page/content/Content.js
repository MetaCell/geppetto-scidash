import React from 'react';
import TestInstancesContainer from '../../test-instances/TestInstancesContainer';
import TestSuitesContainer from '../../test-suites/TestSuitesContainer';
import PagesService from '../../../services/PagesService';


export default class Content extends React.Component {

    constructor(props, context){
        super(props, context);

        this.props = props;
    }

    render() {
        let pagesService = new PagesService()

        if (this.props.currentPage == pagesService.TESTS_PAGE)
            return (
                <TestInstancesContainer />
            )

        if (this.props.currentPage == pagesService.SUITES_PAGE)
            return (
                <TestSuitesContainer />
            )
    }
}

