import { connect } from 'react-redux';
import EditModel from './EditModel'
import { activateEditModel } from '../../actions/creators/header';


const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  activateEditModel: () => dispatch(activateEditModel())
})

export default connect( mapStateToProps, mapDispatchToProps )(EditModel)
