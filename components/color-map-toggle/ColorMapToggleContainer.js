import { connect } from 'react-redux';
import ColorMapToggle from './ColorMapToggle';


const mapStateToProps = state => {
    return {
        colorBlind: state.header.colorBlind
    };
}

const mapDispatchToProps = dispatch => {
    return {
        toggleColorBlind: () => dispatch({ type: "TOGGLE_COLOR_BLIND" })
    };
}

const ColorMapToggleContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ColorMapToggle)


export default ColorMapToggleContainer;
