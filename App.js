import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";


import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { grey500, blueGrey900, brown500 } from "material-ui/styles/colors";
import injectTapEventPlugin from "react-tap-event-plugin";
import ScidashContainer from "./components/scidash/ScidashContainer";
import InitialStateService from "./services/InitialStateService";
import Loader from "./components/loader/Loader";

// Needed for onTouchTap
import scidashApp from "./reducers/scidash-app";

injectTapEventPlugin();


// list of props here --> https://github.com/mui-org/material-ui/blob/master/src/styles/baseThemes/lightBaseTheme.js
const customTheme = {
  palette: {
    primary1Color: grey500,
    primary2Color: blueGrey900,
    primary3Color: "#b0ac9a",
    pickerHeaderColor: "#b0ac9a",
  },
  chip: {
    backgroundColor: brown500,
    textColor: "white",
  },
};


const theme = getMuiTheme(customTheme);


export default class App extends React.Component {

  constructor (props, context) {
    super(props, context);

    this.state = {
      store: null
    };
  }

  componentDidMount () {

    InitialStateService.getInstance().generateInitialState().then(initialState => {
      this.setState({
        store: createStore(scidashApp, initialState)
      });
    });

  }

  render () {

    if (this.state.store === null) {
      return (
        <Loader />
      );
    } else {
      return (
        <MuiThemeProvider muiTheme={theme}>
          <Provider store={this.state.store}>
            <ScidashContainer />
          </Provider>
        </MuiThemeProvider>
      );
    }

  }
}
