import React, { Component } from 'react';
import TestInstances from '../../components/TestInstances.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export class Home extends React.Component {

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <TestInstances/>
                </MuiThemeProvider>
            </div>
        );
    }
}

