import { connect } from "react-redux";
import Content from "./Content";

const mapStateToProps = state => ({
  activeView: state.global.activeView,
  activePage: state.header.activePage,
  createModelActive: state.header.createModelActive,
  createTestActive: state.header.createTestActive
});

const mapDispatchToProps = () => ({
});

const ScidashContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Content);


export default ScidashContainer;
