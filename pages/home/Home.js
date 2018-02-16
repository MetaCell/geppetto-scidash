import React, { Component } from 'react';
import TestInstances from '../../components/TestInstances.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { grey500, blueGrey900, grey400 } from 'material-ui/styles/colors';

// list of props here --> https://github.com/mui-org/material-ui/blob/master/src/styles/baseThemes/lightBaseTheme.js
const customTheme = {
    palette: { 
      primary1Color: grey500,
      primary2Color: blueGrey900,
      primary3Color: grey400,
      pickerHeaderColor: grey400,
    }
};
  
const theme = getMuiTheme(customTheme);

export class Home extends React.Component {
    render() {
        return (
            <div>
                <MuiThemeProvider muiTheme={theme}>
                    <TestInstances/>
                </MuiThemeProvider>
            </div>
        );
    }
}

