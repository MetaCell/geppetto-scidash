import { connect } from "react-redux"
import ModelViewDetails from "./ModelViewDetails"

const mapStateToProps = (state, ownProps) => {
  let modelInstance = ownProps.value;

  return {
    customContentStyle: {
      width: "900px",
      height: "900px",
    },
    modelInstance: modelInstance,
  }
}

const mapDispatchToProps = dispatch => ({})

const ModelViewDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModelViewDetails)

export default ModelViewDetailsContainer
