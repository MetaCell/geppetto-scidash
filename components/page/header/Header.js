import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import FontIcon from "material-ui/FontIcon";
import DrawerContainer from "../Drawer/DrawerContainer";
import PagesService from "../../../services/PagesService";
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Download from 'material-ui/svg-icons/file/file-download';


export default class Header extends React.Component {

  constructor (props, context){
    super(props, context);
    this.state = {
    	open: false,
    };
    this.props = props;
    this.wrapperSettings = null;

    this.wrapSettingsRef = this.wrapSettingsRef.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  componentWillMount (){
    document.addEventListener("mousedown", event => this.props.handleClickOutsideSettings(this.wrapperSettings, event, this.props.showSettings));
  }

  componentWillUnmount (){
    document.removeEventListener("mousedown", event => this.props.handleClickOutsideSettings(this.wrapperSettings, event, this.props.showSettings));
  }
  
  handleTouchTap(event){
	    // This prevents ghost click.
	    event.preventDefault();

	    this.setState({
	      open: true,
	      anchorEl: event.currentTarget,
	    });
  }

  handleRequestClose(){
	    this.setState({
	      open: false,
	    });
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

            { this.props.userInfo.isLogged && this.props.userInfo.userObject.username!=undefined?
              <div className="col-md-3 auth-links">
                <RaisedButton className="userButton loggedButton" 
                	label={this.props.userInfo.userObject.username.chartAt(0)}
                	onTouchTap={this.handleTouchTap}
                	style={{
                		marginRight: "10px"
                }}><FontIcon className={"fa fa-user loggedIcon"}></FontIcon></RaisedButton>
                <RaisedButton href="/auth/logout" className="userButton logoutButton" label="Logout" style={{
                    marginRight: "10px"
                }}/>
                <Popover
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                onRequestClose={this.handleRequestClose}
              >
                <Menu>
                  <MenuItem primaryText={this.props.userInfo.userObject.username} />
                  <MenuItem primaryText="Logout" leftIcon={<Download />} />
                </Menu>
              </Popover>
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
