import { connect } from 'react-redux';
import ModelDetails from './ModelDetails';
import Helper from '../../shared/Helper';


const mapStateToProps = (state, ownProps) => {

    let helper = new Helper();

    return {
        modelClassName: helper.noneIfEmptyString(ownProps.model.get('model_class').get('class_name')),
        modelClassUrl: helper.noneIfEmptyString(ownProps.model.get('model_class').get('url')),
        classCapabilities: helper.noneIfEmptyArray(ownProps.model.get('model_class').get('capabilities')),
        instanceName: helper.noneIfEmptyArray(ownProps.model.get('name')),
        instanceSource: helper.noneIfEmptyArray(ownProps.model.get('url')),
        runParameters: helper.noneIfEmptyMap(ownProps.model.get('run_params'))
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

const ModelDetailsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModelDetails)

export default ModelDetailsContainer;
