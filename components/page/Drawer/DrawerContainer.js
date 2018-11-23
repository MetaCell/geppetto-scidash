import { connect } from 'react-redux';
import Drawer from './Drawer';
import { toggleDrawer, changePage } from '../../../actions/creators/header';


const mapStateToProps = state => {
  return {
    drawerActive: state.header.drawerActive,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    toggleDrawer: () => dispatch(toggleDrawer()),
    changePage: (page) => dispatch(changePage(page))
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Drawer)
