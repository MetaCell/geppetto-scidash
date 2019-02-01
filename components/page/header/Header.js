import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import DrawerContainer from "../Drawer/DrawerContainer";
import PagesService from "../../../services/PagesService";

export default class Header extends React.Component {

  constructor (props, context){
    super(props, context);

    this.props = props;
    this.wrapperSettings = null;

    this.wrapSettingsRef = this.wrapSettingsRef.bind(this);
  }

  componentWillMount (){
    document.addEventListener("mousedown", event => this.props.handleClickOutsideSettings(this.wrapperSettings, event, this.props.showSettings));
  }

  componentWillUnmount (){
    document.removeEventListener("mousedown", event => this.props.handleClickOutsideSettings(this.wrapperSettings, event, this.props.showSettings));
  }

  wrapSettingsRef (node){
    this.wrapperSettings = node;
  }

  render () {
    const { activePage, createTestActive, createModelActive } = this.props;
    const pagesService = new PagesService();

    if (this.props.showSettings)
    {this.props.settingsPopupStyle["display"] = "block";}
    else
    {this.props.settingsPopupStyle["display"] = "none";}
    let title = "";
    if (activePage == pagesService.TESTS_PAGE) {
      if (createTestActive) {
        title = "New Test";
      }
      else {
        title = "Tests";
      }
    }
    else if (activePage == pagesService.MODELS_PAGE) {
      if (createModelActive) {
        title = "New Model";
      }
      else {
        title = "Model";
      }
    }
    else if (activePage == pagesService.SCORES_PAGE){
      title = "Scores";
    }
    else if (activePage == pagesService.SETTINGS_PAGE){
      title = "Settings";
    }
    else if (activePage == pagesService.SCHEDULING_PAGE){
      title = "Scheduling";
    }
    return (
      <div id="header">
        <div id="scidash-logo">
          <h3 style={{ marginLeft: "60px", marginTop: "15px", width: "200px" }}>{title}</h3>
        </div>
        <DrawerContainer />
        <div id="headerLinks">
          <div className="row">
            {activePage == pagesService.SCORES_PAGE ?
              <div className="col-md-3 col-md-offset-4" style={this.props.buttonsStyle}>
                <RaisedButton label="Tests View" primary={this.props.testsActive} onClick={this.props.openTestsView} />
                <RaisedButton label="Suites View" primary={this.props.suitesActive} onClick={this.props.openSuitesView} />
              </div>
              : null }

            { this.props.userInfo.isLogged ?
              <div className="col-md-3 auth-links">
                        Logged as 
                {" " + this.props.userInfo.userObject.username}
                <a href="/auth/logout">Logout</a>
              </div>
              :
              <div className="col-md-3 auth-links">
                <a href="/auth/login">Login</a>
                <a href="/auth/sign-up">Sign-up</a>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}
