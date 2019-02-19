import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import FontIcon from "material-ui/FontIcon";
import DrawerContainer from "../Drawer/DrawerContainer";
import PagesService from "../../../services/PagesService";
import Popover from 'material-ui/Popover';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

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
    
    var userinitial, dateJoined, lastLogin; 
    if (this.props.userInfo.userObject.username!=undefined) {
        userinitial = this.props.userInfo.userObject.username.split('')[0];
    }
    if (this.props.userInfo.userObject.date_joined!=undefined) {
        dateJoined = this.props.userInfo.userObject.date_joined.split('T')[0];
    }
    if (this.props.userInfo.userObject.last_login!=undefined) {
        lastLogin = this.props.userInfo.userObject.last_login.split('T')[0];
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
                <RaisedButton className="userButton" label={userinitial} 
                    buttonStyle={{ borderRadius: 50 ,backgroundColor : "blue"}}
                	onTouchTap={this.handleTouchTap} 
                    style={{marginRight: "10px",borderRadius:50,float : "right"}}>
                   <FontIcon className={"fa fa-user loggedIcon"}/>
                </RaisedButton>
                <Popover open={this.state.open} anchorEl={this.state.anchorEl}
                	anchorOrigin={{horizontal: 'left', vertical: 'bottom'}} 
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose} style={{marginTop: "10px"}} > 
                <Card>
			        <CardHeader
			            title={this.props.userInfo.userObject.username}
			            subtitle={this.props.userInfo.userObject.email}
			            avatar={<Avatar>{userinitial}</Avatar>}
			            actAsExpander={true}
			            showExpandableButton={true}/>
			        <CardActions>
			            <FlatButton label="Reset Password" href="/auth/password-reset" style={{border: "2px solid lightgrey"}} />
			            <FlatButton label="Logout" href="/auth/logout" style={{border: "2px solid lightgrey"}} />
			            </CardActions>
			            <CardText expandable={true}>
			          	<List style={{textAlign : "center"}}>
			                <ListItem primaryText="Name" 
			                    secondaryText= {this.props.userInfo.userObject.first_name} />
			                <ListItem primaryText="Date Joined" 
			                	secondaryText= {dateJoined} />
			                <ListItem primaryText="Last Login" 
			                	secondaryText= {lastLogin} />
			             </List>
			         </CardText>
		         </Card>
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
