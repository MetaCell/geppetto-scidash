import React from 'react';
import {Card, CardText} from 'material-ui/Card';
import Helper from '../common/Helper';
import ModelDetails from './ModelDetails';

export default class ScoreDetails extends React.Component {

    constructor(props, context){
        super(props, context);

        this.helper = new Helper();

        this.props = props;

        this.state = {
            scoreInstance: props.scoreInstance
        }
    }

    render(){
        console.log(this.state);

        let modelInstance = this.state.scoreInstance.get("model_instance");

        return (
            <Card>
                <CardText>
                    <div style={{ float:"left", width: "360px" }}>
                        <h4>{this.state.scoreInstance.get("score_type") + " details"}</h4>
                        <Card>
                            <CardText>
                                <p><strong>Test name: </strong>
                                    {this.helper.isEmptyString(this.state.scoreInstance.get("score_type")) ? (
                                        "None"
                                    ): (
                                        this.state.scoreInstance.get("score_type")
                                    )}
                                </p>
                                <p><strong>Score: </strong>
                                    {this.helper.isEmptyString(this.state.scoreInstance.get("score")) ? (
                                        "None"
                                    ): (
                                        this.state.scoreInstance.get("score").toFixed(3) + " / " + this.state.scoreInstance.get("sort_key").toFixed(2)
                                    )}
                                </p>
                                <p><strong>Test class: </strong>
                                    {this.helper.isEmptyString(this.state.scoreInstance.get("test_instance").get("test_class").get("class_name")) ? (
                                        "None"
                                    ): (
                                        this.state.scoreInstance.get("test_instance").get("test_class").get("class_name")
                                    )}
                                </p>
                                <p><strong>Score type: </strong>
                                    {this.helper.isEmptyString(this.state.scoreInstance.get("score_type")) ? (
                                        "None"
                                    ): (
                                        this.state.scoreInstance.get("score_type")
                                    )}
                                </p>
                                <p><strong>Test suite: </strong>
                                    N/A
                                </p>
                                <p><strong>Build info: </strong>
                                {this.helper.isEmptyString(this.state.scoreInstance.get("test_instance")) ? (
                                    "None"
                                ): (
                                    this.state.scoreInstance.get("test_instance").get("build_info")
                                )}
                                </p>
                                <p><strong>Hostname: </strong>
                                {this.helper.isEmptyString(this.state.scoreInstance.get("test_instance")) ? (
                                    "None"
                                ): (
                                    this.state.scoreInstance.get("test_instance").get("build_info")
                                )}
                                </p>
                                <p><strong>Timestamp: </strong>
                                {this.helper.isEmptyString(this.state.scoreInstance.get("timestamp")) ? (
                                    "None"
                                ): (
                                    this.state.scoreInstance.get("timestamp")
                                )}
                                </p>
                                <hr />
                                <p><strong>Observation: </strong>
                                {this.helper.isEmptyString(this.state.scoreInstance.get("test_instance")) ? (
                                    "None"
                                ): (
                                    (
                                    <span>
                                        <a href={this.state.scoreInstance.get("test_instance").get("observation").get("url")}>{this.state.scoreInstance.get("test_instance").get("observation").get("url")}</a>
                                        <ul>
                                            <li>mean: {this.state.scoreInstance.get("test_instance").get("observation").get("mean")}</li>
                                            <li>std: {this.state.scoreInstance.get("test_instance").get("observation").get("std")}</li>
                                        </ul>
                                    </span>
                                    )
                                )}
                                </p>
                            </CardText>
                        </Card>
                    </div>
                    <div style={{ float:"right", width:"360px", wordWrap: "break-word" }}>
                        <h4>Model details</h4>
                        <ModelDetails modelInstance={modelInstance} />
                    </div>
                    <div style={{ clear:"both" }}></div>
                </CardText>
            </Card>
        );

    }
}
