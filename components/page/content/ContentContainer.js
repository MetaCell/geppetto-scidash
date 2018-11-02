import { connect } from 'react-redux';
import Content from './Content';


const mapStateToProps = state => {
    return {
        currentPage: state.global.currentPage
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

