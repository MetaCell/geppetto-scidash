import { connect } from 'react-redux';
import Content from './Content';


const mapStateToProps = state => {
    return {
        activeView: state.global.activeView,
        activePage: state.header.activePage
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

const ScidashContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Content)


export default ScidashContainer;

