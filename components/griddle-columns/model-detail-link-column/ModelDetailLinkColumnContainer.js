import { connect } from "react-redux"
import ModelDetailLinkColumn from "./ModelDetailLinkColumn"

const mapStateToProps = (state, ownProps) => {
  let modelInstanceObject = ownProps.value
  let modelClass = modelInstanceObject.get("model_class")

  let className = modelClass ? modelClass.get("class_name") : "";

  return {
    customContentStyle: {
      width: "900px",
      height: "900px",
    },
    className: className,
    instanceName: modelInstanceObject.get("name"),
    modelInstance: modelInstanceObject,
  }
}

const mapDispatchToProps = dispatch => ({})

const ModelDetailLinkColumnContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModelDetailLinkColumn)

export default ModelDetailLinkColumnContainer
