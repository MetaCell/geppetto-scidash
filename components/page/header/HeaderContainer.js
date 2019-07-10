import { connect } from "react-redux";
import Header from "./Header";
import PagesService from "../../../services/PagesService";
import { changePage } from "../../../actions/creators/header";
import {
  toggleSettings,
  hideSettings,
} from "../../../actions/creators/header";

const mapStateToProps = state => ({ ...state.header,
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
  activePage: state.header.activePage
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

  logoClick: () => dispatch(changePage(new PagesService().SCORES_PAGE, dispatch))
});

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);


export default HeaderContainer;
