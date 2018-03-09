import React, { Component } from 'react';
import TestInstances from '../../components/TestInstances';
import TestSuites from '../../components/TestSuites';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { grey500, blueGrey900, grey400 } from 'material-ui/styles/colors';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();



// list of props here --> https://github.com/mui-org/material-ui/blob/master/src/styles/baseThemes/lightBaseTheme.js
const customTheme = {
    palette: {
      primary1Color: grey500,
      primary2Color: blueGrey900,
      primary3Color: '#b0ac9a',
      pickerHeaderColor: '#b0ac9a',
    }
};

const theme = getMuiTheme(customTheme);

export class Home extends React.Component {

    constructor(props, context){
        super(props, context);

        this.state = {
            testsPage: true,
            suitesPage: false
        }

        this.openTestsPage = this.openTestsPage.bind(this)
        this.openSuitesPage = this.openSuitesPage.bind(this)
    }

    openTestsPage(){
        this.setState({
            testsPage: true,
            suitesPage: false
        });
    }

    openSuitesPage(){
        this.setState({
            testsPage: false,
            suitesPage: true
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
                    <div className="col-md-2 col-md-offset-5">
                        <button onClick={this.openTestsPage}>
                            Tests
                        </button>
                        <button onClick={this.openSuitesPage}>
                            Suites
                        </button>
                    </div>
                </div>
                <MuiThemeProvider muiTheme={theme}>
                    {currentPage}
                </MuiThemeProvider>
            </div>
        );
    }
}

