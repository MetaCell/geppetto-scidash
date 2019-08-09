import { connect } from "react-redux"
import Helper from "../../../shared/Helper";
import TestDetailLinkColumn from "./TestDetailLinkColumn"

const mapStateToProps = (state, ownProps) => {
    let testInstanceObject = ownProps.value

    return {
        testInstanceObject: testInstanceObject
    }
}

const mapDispatchToProps = dispatch => ({});


const TestDetailLinkColumnContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TestDetailLinkColumn)

export default TestDetailLinkColumnContainer
