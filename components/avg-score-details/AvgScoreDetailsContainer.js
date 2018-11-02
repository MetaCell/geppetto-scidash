import { connect } from 'react-redux';
import AvgScoreDetails from './AvgScoreDetails';


const mapStateToProps = (state, ownProps) => {
    let modelName = "";
    let scoreList = ownProps.scoreList;

    if (scoreList.size > 0){
        modelName = scoreList.get(0).get('model_instance').get('model_class').get('class_name');
    }

    return {
        colorBlind: ownProps.colorBlind,
        scoreList,
        modelName
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

const AvgScoreDetailsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AvgScoreDetails)

export default AvgScoreDetailsContainer;

