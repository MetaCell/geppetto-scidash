import { connect } from 'react-redux';
import ColorMapToggle from './ColorMapToggle';
import { toggleColorBlind } from '../../actions/creators/header';


const mapStateToProps = state => ({ colorBlind: state.header.colorBlind })

const mapDispatchToProps = dispatch => ({ toggleColorBlind: () => dispatch(toggleColorBlind()) })

const ColorMapToggleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ColorMapToggle)


export default ColorMapToggleContainer;
