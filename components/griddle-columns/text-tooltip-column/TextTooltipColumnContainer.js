import { connect } from "react-redux"
import TextTooltipColumn from "./TextTooltipColumn"

const mapStateToProps = (state, ownProps) => {
  let modelClass = ownProps.value

  return {
    customContentStyle: {
      width: "900px",
      height: "900px",
    },
    modelClass
  }
}

const mapDispatchToProps = dispatch => ({})

const TextTooltipColumnContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TextTooltipColumn)

export default TextTooltipColumnContainer
