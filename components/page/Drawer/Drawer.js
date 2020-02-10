import React from "react";
import Icon from "@material-ui/core/Icon";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import ScidashLogo from "../../../assets/scidash_logo.png";
import PagesService from "../../../services/PagesService";

class SciDashMenuItem extends React.Component {
  render() {
    return (
      <MenuItem id={this.props.id} onClick={this.props.onClick}>
        {this.props.leftIcon}
        <div>{this.props.primaryText}</div>
      </MenuItem>
    )
  }
}

export default ({ drawerActive, changePage, toggleDrawer, activePage, editModelActive, editTestActive, userLogged }) => {
  const pagesService = new PagesService();

  const handleMenuClick = page => {
    changePage(page);
    toggleDrawer();
  };

  const handleClickUserLogged = page => {
    if (userLogged) {
      handleMenuClick(page);
    } else {
      handleMenuClick(pagesService.SCORES_PAGE);
    }
  }

  return (
    <div>
      <IconButton
        id="hamMenu"
        onClick={() => toggleDrawer()}>
        <Icon className="fa fa-bars" />
      </IconButton>
      <Drawer
        width={265}
        open={drawerActive}
      >
        <img style={styles.logo} src={ScidashLogo} alt="" />
        <Divider />
        <SciDashMenuItem
          id="hamMenuScores"
          primaryText="Test scores"
          leftIcon={<i className="fa fa-star-half-o drawer-icon" />}
          onClick={() => handleMenuClick(pagesService.SCORES_PAGE)}
        />

        <SciDashMenuItem
          id="hamMenuSuites"
          primaryText="Suite scores"
          leftIcon={<i className="fa fa-suitcase drawer-icon" />}
          onClick={() => handleMenuClick(pagesService.SUITES_PAGE)}
        />

        {userLogged == true
          ? (<SciDashMenuItem
            id="hamMenuTests"
            primaryText="Tests"
            onClick={() => handleMenuClick(pagesService.TESTS_PAGE)}
            leftIcon={<i className="fa fa-laptop drawer-icon" />}
            disabled={!userLogged}
          />)
          : (<span data-tooltip-right="User must be logged in to view this page">
            <SciDashMenuItem
              id="hamMenuTests"
              primaryText="Tests"
              onClick={() => handleMenuClick(pagesService.TESTS_PAGE)}
              leftIcon={<i className="fa fa-laptop drawer-icon" />}
              disabled={!userLogged}
            />
          </span>)}

        {userLogged == true
          ? (<SciDashMenuItem
            id="hamMenuModels"
            primaryText="Models"
            onClick={() => handleMenuClick(pagesService.MODELS_PAGE)}
            leftIcon={<i id="gpt-3dshow" className="gpt-3dshow drawer-icon" />}
            disabled={!userLogged}
          />)
          : (<span data-tooltip-right="User must be logged in to view this page">
            <SciDashMenuItem
              id="hamMenuModels"
              primaryText="Models"
              onClick={() => handleMenuClick(pagesService.MODELS_PAGE)}
              leftIcon={<i id="gpt-3dshow" className="gpt-3dshow drawer-icon" />}
              disabled={!userLogged}
            />
          </span>)}

        <SciDashMenuItem
          id="hamMenuSettings"
          primaryText="Settings"
          leftIcon={<i className="fa fa-cogs drawer-icon" />}
          onClick={() => handleMenuClick(pagesService.SETTINGS_PAGE)}
        />

        {userLogged == true
          ? (<SciDashMenuItem
            id="hamMenuScheduling"
            primaryText="Scheduling"
            leftIcon={<i className="fa fa-calendar drawer-icon" />}
            onClick={() => handleMenuClick(pagesService.SCHEDULING_PAGE)}
            disabled={!userLogged}
          />)
          : (<span data-tooltip-right="User must be logged in to view this page">
            <SciDashMenuItem
              id="hamMenuScheduling"
              primaryText="Scheduling"
              leftIcon={<i className="fa fa-calendar drawer-icon" />}
              onClick={() => handleMenuClick(pagesService.SCHEDULING_PAGE)}
              disabled={!userLogged}
            />
          </span>)}
      </Drawer>
    </div>
  );

};

// FIXME: move styles to scidash.less
const styles = {
  logo: {
    width: 205,
    marginTop: 5,
    marginLeft: 25,
    marginRight: 35,
    marginBottom: 8,
  },
};
