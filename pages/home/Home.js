import React, { Component } from 'react';
import TestInstances from '../../components/TestInstances';
import TestSuites from '../../components/TestSuites';
import RaisedButton from 'material-ui/RaisedButton';
import { grey500, blueGrey900, grey400 } from 'material-ui/styles/colors';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


export default class Home extends React.Component {

    constructor(props, context){
        super(props, context);

        this.state = {
            testsPage: true,
            suitesPage: false,
            testsActive: true,
            suitesActive: false
        }

        this.openTestsPage = this.openTestsPage.bind(this)
        this.openSuitesPage = this.openSuitesPage.bind(this)
    }

    openTestsPage(){
        this.setState({
            testsPage: true,
            suitesPage: false,
            testsActive: true,
            suitesActive: false
        });
    }

    openSuitesPage(){
        this.setState({
            testsPage: false,
            suitesPage: true,
            testsActive: false,
            suitesActive: true
        });
    }

    render() {
        let currentPage = null;

        if (this.state.testsPage)
            currentPage = <TestInstances />
        if (this.state.suitesPage)
            currentPage = <TestSuites />

        return (
            <div>
                <div className="row">
                    <div className="col-md-3 col-md-offset-5">
                        <RaisedButton label="Tests View" primary={this.state.testsActive} onClick={this.openTestsPage} />
                        <RaisedButton label="Suites View" primary={this.state.suitesActive} onClick={this.openSuitesPage} />
                    </div>
                </div>
                {currentPage}
            </div>
        );
    }
}

