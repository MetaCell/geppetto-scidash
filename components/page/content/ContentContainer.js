import { connect } from 'react-redux';
import Content from './Content';

const mapStateToProps = state => {
    return {
        activeView: state.global.activeView,
        activePage: state.header.activePage,
        editModelActive: state.header.editModelActive,
        editTestActive: state.header.editTestActive
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

const ScidashContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Content)


export default ScidashContainer;

