import { connect } from "react-redux";
import ModelDetailLinkColumn from "./ModelDetailLinkColumn"


const mapStateToProps = (state, ownProps) => {
    return {
        customContentStyle: {
            width: '900px',
            height: '900px'
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return { }
}

const ModelDetailLinkColumnContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModelDetailLinkColumn)


export default ModelDetailLinkColumnContainer;
