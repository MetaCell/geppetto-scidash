import { connect } from 'react-redux';
import ScoreMatrix from './ScoreMatrix';
import Helper from '../../shared/Helper';


const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {}
}

const ScoreMatrixContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ScoreMatrix)

export default ScoreMatrixContainer;

