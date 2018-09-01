import { connect } from 'react-redux';
import ColorMapToggle from './ColorMapToggle';
import { toggleColorBlind } from '../../actions/creators/header';


const mapStateToProps = state => {
    return {
        colorBlind: state.header.colorBlind
    };
}

const mapDispatchToProps = dispatch => {
    return {
        toggleColorBlind: () => dispatch(toggleColorBlind())
    };
}

const ColorMapToggleContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ColorMapToggle)


export default ColorMapToggleContainer;
