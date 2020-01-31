import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware, ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router-dom";
import logger from "redux-logger";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from '@material-ui/core/styles';
import { grey, blueGrey, brown } from "@material-ui/core/colors";
// import injectTapEventPlugin from "react-tap-event-plugin";
import InitialStateService from "./services/InitialStateService";
import Loader from "./components/loader/Loader";
import PagesService from "./services/PagesService";
import HeaderContainer from "./components/page/header/HeaderContainer";
import FooterContainer from "./components/page/footer/FooterContainer";

// Needed for onTouchTap
import scidashApp from "./reducers/scidash-app";
import ScoresContainer from "./components/scores/ScoresContainer";
import TestSuitesContainer from "./components/test-suites/TestSuitesContainer";
import ModelsContainer from "./components/models/ModelsContainer";
import TestsContainer from "./components/tests/TestsContainer";
import Settings from "./components/settings/Settings";
import SchedulingContainer from "./components/scheduling/SchedulingContainer";
import TestCreateContainer from "./components/test-create/TestCreateContainer";
import ModelCreateContainer from "./components/model-create/ModelCreateContainer";
import ModelEditContainer from "./components/model-edit/ModelEditContainer";
import TestEditContainer from "./components/test-edit/TestEditContainer";

// injectTapEventPlugin();


// list of props here --> https://github.com/mui-org/material-ui/blob/master/src/styles/baseThemes/lightBaseTheme.js
const customTheme = {
  palette: {
    primary1Color: grey[500],
    primary2Color: blueGrey[900],
    primary3Color: "#b0ac9a",
    pickerHeaderColor: "#b0ac9a",
  },
  chip: {
    backgroundColor: brown[500],
    textColor: "white",
  },
};


const theme = createMuiTheme(customTheme);


export default class App extends React.Component {

  constructor (props, context) {
    super(props, context);

    this.state = { store: null };

    this.history = createBrowserHistory();
    this.pagesService = new PagesService();
  }

  componentDidMount () {

    InitialStateService.getInstance().generateInitialState().then(initialState => {
      this.setState({
        store: createStore(
          scidashApp(this.history),
          initialState,
          compose(
            applyMiddleware(
              routerMiddleware(this.history),
              logger
            )
          )
        )
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
        <MuiThemeProvider theme={theme}>
          <Provider store={this.state.store}>
            <ConnectedRouter history={this.history}>
              <div className="mainContainer">
                <HeaderContainer />
                <div className="midContainer">
                  <div className="row">
                    <div className="col-md-12">
                      <Switch>
                        <Route path={this.pagesService.SCORES_PAGE} component={ScoresContainer} exact />
                        <Route path={this.pagesService.SUITES_PAGE} component={TestSuitesContainer} exact />
                        <Route path={this.pagesService.TESTS_PAGE} component={TestsContainer} exact />
                        <Route path={this.pagesService.TESTS_CREATE_PAGE} component={TestCreateContainer} exact />
                        <Route path={this.pagesService.MODELS_PAGE} component={ModelsContainer} exact />
                        <Route path={this.pagesService.MODELS_CREATE_PAGE} component={ModelCreateContainer} exact />
                        <Route path={this.pagesService.SETTINGS_PAGE} component={Settings} exact />
                        <Route path={this.pagesService.SCHEDULING_PAGE} component={SchedulingContainer} exact />
                        <Route path={this.pagesService.MODELS_EDIT_PAGE} component={ModelEditContainer} exact />
                        <Route path={this.pagesService.TESTS_EDIT_PAGE} component={TestEditContainer} exact />
                      </Switch>
                    </div>
                  </div>
                </div>
                <FooterContainer />
              </div>
            </ConnectedRouter>
          </Provider>
        </MuiThemeProvider>
      );
    }

  }
}
