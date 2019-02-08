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

    if (this.props.showSettings) {
      this.props.settingsPopupStyle["display"] = "block";
    } else {
      this.props.settingsPopupStyle["display"] = "none";
    }
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

            { this.props.userInfo.isLogged ?
              <div className="col-md-3 auth-links">
                <RaisedButton href="/auth/login" className="userButton loginButton" label={" " + this.props.userInfo.userObject.username} style={{
                    marginRight: "10px"
                }}/>
                <RaisedButton href="/auth/logout" className="userButton logoutButton" label="Logout" style={{
                    marginRight: "10px"
                }}/>
              </div>
              :
              <div className="col-md-3 auth-links">
              	<RaisedButton href="/auth/login" className="userButton loginButton" label="Login" style={{
                    marginRight: "10px"
                }}/>
              	<RaisedButton href="/auth/sign-up" className="userButton signUpButton" label="Sign-Up" style={{
                    marginRight: "10px"
                }}/>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}
