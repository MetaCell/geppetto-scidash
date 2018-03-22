define(function (require) {

    var React = require('react');
    var Home = require('./home/Home').Home;
    var Header = require('./Header');
    var Footer = require('./Footer');
    var MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
    var getMuiTheme = require('material-ui/styles/getMuiTheme').default;
    var grey500 = require('material-ui/styles/colors');
    var blueGrey900 = require('material-ui/styles/colors');

    // list of props here --> https://github.com/mui-org/material-ui/blob/master/src/styles/baseThemes/lightBaseTheme.js
    const customTheme = {
        palette: {
            primary1color: grey500,
            primary2color: blueGrey900,
            primary3color: '#b0ac9a',
            pickerheadercolor: '#b0ac9a',
        }
    };

    const theme = getMuiTheme(customTheme);

    return class MainTemplate extends React.Component {

        render() {
            return (
                <div className="mainContainer">
                    <Header/>
                    <div className="midContainer">
                        <div className="row">
                            <div className="col-md-12">
                                <MuiThemeProvider muiTheme={theme}>
                                    <Home />
                                </MuiThemeProvider>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            );
        }
    };
});
