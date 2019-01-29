import { connect } from "react-redux";
import Header from "./Header";
import {
  toggleSettings,
  hideSettings,
} from "../../../actions/creators/header";
import {
  openSuitesView,
  openTestsView
} from "../../../actions/creators/shared";

const mapStateToProps = state => ({
  ...state.header,
  headerLinksStyle: {
    position: "fixed",
    top: 25,
    right: 80,
    fontSize: 26
  },
  settingsPopupStyle: {
    position: "absolute",
    top: 0,
    right: 95,
    width: 150,
    zIndex: 100
  },
  buttonsStyle: {
    position: "relative",
    left: 62,
    minWidth: 270
  },
  userInfo: state.user,
  activePage: state.header.activePage,
  createModelActive: state.header.createModelActive,
  editTestActive: state.header.editTestActive
});

const mapDispatchToProps = dispatch => ({

  toggleSettings: () => {
    dispatch(toggleSettings());
  },

  handleClickOutsideSettings: (wrapperSettings, event, settingsDisplaying) => {
    if (wrapperSettings && !wrapperSettings.contains(event.target) && settingsDisplaying) {
      dispatch(hideSettings());
    }
  },
  openTestsView: () => {
    dispatch(openTestsView());
  },

  openSuitesView: () => {
    dispatch(openSuitesView());
  }
});

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);


export default HeaderContainer;
