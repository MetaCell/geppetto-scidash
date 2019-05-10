import { connect } from "react-redux";
import { push } from "connected-react-router";
import Drawer from "./Drawer";
import { toggleDrawer, changePage } from "../../../actions/creators/header";


const mapStateToProps = state => ({
  drawerActive: state.header.drawerActive,
  userLogged: state.user.isLogged,
});

const mapDispatchToProps = dispatch => ({
  toggleDrawer: () => dispatch(toggleDrawer()),
  changePage: page => dispatch(changePage(page, dispatch))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Drawer);
