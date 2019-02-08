import React from "react";
import DrawerContainer from "../Drawer/DrawerContainer";
import PagesService from "../../../services/PagesService";

export default class Header extends React.Component {

  constructor (props, context){
    super(props, context);

    this.props = props;
  }

  componentWillMount (){
    document.addEventListener("mousedown", event => this.props.handleClickOutsideSettings(this.wrapperSettings, event, this.props.showSettings));
  }

  componentWillUnmount (){
    document.removeEventListener("mousedown", event => this.props.handleClickOutsideSettings(this.wrapperSettings, event, this.props.showSettings));
  }

  render () {
    const { activePage, createTestActive, createModelActive } = this.props;
    const pagesService = new PagesService();

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
        title = "Models";
      }
    }
    else if (activePage == pagesService.SCORES_PAGE){
      title = "Test scores";
    }
    else if (activePage == pagesService.SUITES_PAGE){
      title = "Suite scores";
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
