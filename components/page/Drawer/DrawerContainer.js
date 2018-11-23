import { connect } from 'react-redux';
import Drawer from './Drawer';
import { toggleDrawer } from '../../../actions/creators/header';


const mapStateToProps = state => {
  return {
    drawerActive: state.header.drawerActive
  };
}

const mapDispatchToProps = dispatch => {
  return {
    toggleDrawer: () => dispatch(toggleDrawer())
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Drawer)
