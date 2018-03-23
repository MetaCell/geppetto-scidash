import React, { Component } from 'react';
import TestInstances from '../../components/TestInstances';
import TestSuites from '../../components/TestSuites';
import { grey500, blueGrey900, grey400 } from 'material-ui/styles/colors';

import GEPPETTO from 'geppetto';
import Scidash from '../../common/Scidash';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


export default class Home extends React.Component {

    constructor(props, context){
        super(props, context);

        this.state = {
            testsActive: true,
            suitesActive: false
        }
    }

    componentDidMount(){
        GEPPETTO.on(Scidash.TESTS_PAGE_ACTIVATED, this.openTestsPage, this);
        GEPPETTO.on(Scidash.SUITES_PAGE_ACTIVATED, this.openSuitesPage, this);
        console.log(GEPPETTO);
    }

    componentWillUnmount(){
        GEPPETTO.off(Scidash.TESTS_PAGE_ACTIVATED, this.openTestsPage, this);
        GEPPETTO.off(Scidash.SUITES_PAGE_ACTIVATED, this.openSuitesPage, this);
    }

    openTestsPage(){
        this.setState({
            testsActive: true,
            suitesActive: false
        });
    }

    openSuitesPage(){
        this.setState({
            testsActive: false,
            suitesActive: true
        });
    }

    render() {
        let currentPage = null;

        if (this.state.testsActive)
            currentPage = <TestInstances />
        if (this.state.suitesActive)
            currentPage = <TestSuites />

        return (
            <div>
                {currentPage}
            </div>
        );
    }
}

