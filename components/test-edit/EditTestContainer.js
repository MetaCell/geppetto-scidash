import { connect } from 'react-redux';
import EditTest from './EditTest'
import { activateEditTest } from '../../actions/creators/header';

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  activateEditTest: () => dispatch(activateEditTest()),
})

export default connect( mapStateToProps, mapDispatchToProps )(EditTest)
