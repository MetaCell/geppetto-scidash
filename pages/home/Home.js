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
            suitesActive: false,
            colorBlind: false
        }
    }

    componentDidMount(){

        let pages = new URLSearchParams(location.search);
        let currentPage = null;

        for (let page of pages) {
            if (page[0] == "page")
                currentPage = page[1].toLowerCase();
        }

        if (currentPage != null){
            if (currentPage == "tests")
                this.openTestsPage(this.state.colorBlind)

            if (currentPage == "suites")
                this.openSuitesPage(this.state.colorBlind)

        }

        GEPPETTO.on(Scidash.TESTS_PAGE_ACTIVATED, this.openTestsPage, this);
        GEPPETTO.on(Scidash.SUITES_PAGE_ACTIVATED, this.openSuitesPage, this);
    }

    componentWillUnmount(){
        GEPPETTO.off(Scidash.TESTS_PAGE_ACTIVATED, this.openTestsPage, this);
        GEPPETTO.off(Scidash.SUITES_PAGE_ACTIVATED, this.openSuitesPage, this);
    }

    openTestsPage(colorBlind){
        this.setState({
            testsActive: true,
            suitesActive: false,
            colorBlind: colorBlind
        });
    }

    openSuitesPage(colorBlind){
        this.setState({
            testsActive: false,
            suitesActive: true,
            colorBlind: colorBlind
        });
    }

    render() {
        let currentPage = null;

        if (this.state.testsActive)
            currentPage = <TestInstances colorBlind={this.state.colorBlind}/>
        if (this.state.suitesActive)
            currentPage = <TestSuites colorBlind={this.state.colorBlind}/>

        return (
            <div>
                {currentPage}
            </div>
        );
    }
}

