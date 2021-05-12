import React from "react";
import Button from "@material-ui/core/Button";
import PersonIcon from '@material-ui/icons/Person';
import Popover from "@material-ui/core/Popover";
import { Card, CardActions, CardHeader, CardContent, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import PagesService from "../../../services/PagesService";
import DrawerContainer from "../Drawer/DrawerContainer";
import Grid from '@material-ui/core/Grid';

export default class Header extends React.Component {

  constructor (props, context) {
    super(props, context);
    this.state = { open: false };
    this.props = props;
    this.wrapperSettings = null;

    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);

    document.addEventListener("mousedown", event => this.props.handleClickOutsideSettings(this.wrapperSettings, event, this.props.showSettings));
  }

  componentWillUnmount () {
    document.removeEventListener("mousedown", event => this.props.handleClickOutsideSettings(this.wrapperSettings, event, this.props.showSettings));
  }

  handleTouchTap (event) {
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleRequestClose () {
    this.setState({ open: false });
  }

  render () {
    const { activePage } = this.props;
    const pagesService = new PagesService();

    let title = "";

    if (activePage == pagesService.TESTS_PAGE) {
      title = "Tests";
    } else if (activePage == pagesService.TESTS_CREATE_PAGE){
      title = "New test";
    } else if (activePage == pagesService.MODELS_PAGE) {
      title = "Models";
    } else if (activePage == pagesService.MODELS_CREATE_PAGE) {
      title = "New model";
    } else if (activePage == pagesService.SCORES_PAGE) {
      title = "Test scores";
    } else if (activePage == pagesService.SUITES_PAGE) {
      title = "Suite scores";
    } else if (activePage == pagesService.SETTINGS_PAGE) {
      title = "Settings";
    } else if (activePage == pagesService.SCHEDULING_PAGE) {
      title = "Scheduling";
    }

    let userinitial, dateJoined, lastLogin;
    let options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "UTC",
      timeZoneName: "short"
    };
    if (this.props.userInfo.userObject.username != undefined) {
      userinitial = this.props.userInfo.userObject.username.split("")[0];
    }
    if (this.props.userInfo.userObject.date_joined != undefined) {
      dateJoined = new Date(this.props.userInfo.userObject.date_joined).toLocaleString("en-US", options);
    }
    if (this.props.userInfo.userObject.last_login != undefined) {
      lastLogin = new Date(this.props.userInfo.userObject.last_login).toLocaleString("en-US", options);
    }
    return (
      <div id="header">
        <div id="scidash-logo" style={{ cursor: "pointer", zIndex: 2 }} onClick={() => this.props.logoClick()}>
          <h3 style={{ marginLeft: "60px", marginTop: "15px", width: "200px" }}>{title}</h3>
        </div>
        <DrawerContainer />
        <div id="headerLinks">
          <div className="row">

            {this.props.userInfo.isLogged
              ? <div className="col-md-3 auth-links">
                <Button
                  id="user-button"
                  className="userButton" label={userinitial} variant="contained"
                  style={{ marginRight: "10px", borderRadius: 50, float: "right", backgroundColor: "#37474f" }}
                  onClick={this.handleTouchTap}
                >
                  <PersonIcon className="loggedIcon" />
                  {userinitial}
                </Button>
                <Popover
                  open={this.state.open} anchorEl={this.state.anchorEl}
                  anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                  transformOrigin={{ horizontal: "left", vertical: "top" }}
                  onClose={this.handleRequestClose} style={{ marginTop: "10px" }}
                >
                  <Card className="user-info-card">
                    <CardHeader
                      title={this.props.userInfo.userObject.username}
                      subtitle={this.props.userInfo.userObject.email}
                      avatar={<Avatar>{userinitial}</Avatar>}
                    />
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={3}>
                          <b>Name:</b>
                        </Grid>
                        <Grid item xs={9}>
                          {this.props.userInfo.userObject.username}
                        </Grid>
                        <Grid item xs={3}>
                          <b>Date Joined:</b>
                        </Grid>
                        <Grid item xs={9}>
                          {lastLogin}
                        </Grid>
                        <Grid item xs={3}>
                          <b>Last Login:</b>
                        </Grid>
                        <Grid item xs={9}>
                          {lastLogin}
                        </Grid>
                        <Grid item xs={6}>
                          <Button id="reset-password" label="Reset Password" href="/auth/password-reset/" style={{ border: "2px solid lightgrey" }}>
                            Reset Password
                          </Button>
                        </Grid>
                        <Grid item xs={6}>
                          <Button id="logout-button" label="Logout" href="/auth/logout/" style={{ border: "2px solid lightgrey" }}>
                            Logout
                          </Button>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Popover>
              </div>
              : <div className="col-md-3 auth-links">
                <Button
                  variant="contained"
                  href="/auth/login/"
                  className="userButton loginButton"
                  label="Login"
                  style={{ marginRight: "10px" }}
                >Login</Button>
                {/* <Button
                  variant="contained"
                  href="/auth/sign-up/"
                  className="userButton signUpButton"
                  label="Sign-Up"
                  style={{ marginRight: "10px" }}
                >Sign-Up</Button> */}
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}
