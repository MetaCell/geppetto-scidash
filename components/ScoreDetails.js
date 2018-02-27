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
        let modelInstance = this.state.scoreInstance.get("model_instance");

        return (
            <Card>
                <CardText>
                    <div style={{ float:"left", width: "360px" }}>
                        <h4>{this.state.scoreInstance.get("test_instance").get("test_class").get("class_name") + " details"}</h4>
                        <Card>
                            <CardText>
                                <div><strong>Test name: </strong>
                                    {this.helper.isEmptyString(this.state.scoreInstance.get("test_instance").get("test_class").get("class_name")) ? (
                                        "None"
                                    ): (
                                        this.state.scoreInstance.get("test_instance").get("test_class").get("class_name")
                                    )}
                                </div>
                                <div><strong>Score: </strong>
                                    {this.helper.isEmptyString(this.state.scoreInstance.get("score")) ? (
                                        "None"
                                    ): (
                                        <span style={{
                                            background: this.helper.getBackground(this.state.scoreInstance.get("sort_key"), false),
                                            color: "white"
                                        }}>{this.state.scoreInstance.get("score").toFixed(3) + " / " + this.state.scoreInstance.get("sort_key").toFixed(2)}</span>
                                    )}
                                </div>
                                <div><strong>Test class: </strong>
                                    {this.helper.isEmptyString(this.state.scoreInstance.get("test_instance").get("test_class").get("class_name")) ? (
                                        "None"
                                    ): (
                                        this.state.scoreInstance.get("test_instance").get("test_class").get("class_name")
                                    )}
                                </div>
                                <div><strong>Score type: </strong>
                                    {this.helper.isEmptyString(this.state.scoreInstance.get("score_type")) ? (
                                        "None"
                                    ): (
                                        this.state.scoreInstance.get("score_type")
                                    )}
                                </div>
                                <div><strong>Test suite: </strong>
                                    N/A
                                </div>
                                <div><strong>Build info: </strong>
                                {this.helper.isEmptyString(this.state.scoreInstance.get("test_instance")) ? (
                                    "None"
                                ): (
                                    this.state.scoreInstance.get("test_instance").get("build_info")
                                )}
                                </div>
                                <div><strong>Hostname: </strong>
                                {this.helper.isEmptyString(this.state.scoreInstance.get("test_instance")) ? (
                                    "None"
                                ): (
                                    this.state.scoreInstance.get("test_instance").get("build_info")
                                )}
                                </div>
                                <div><strong>Timestamp: </strong>
                                {this.helper.isEmptyString(this.state.scoreInstance.get("timestamp")) ? (
                                    "None"
                                ): (
                                    new Date(this.state.scoreInstance.get("timestamp")).toLocaleString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        second: 'numeric',
                                        timeZone: 'UTC',
                                        timeZoneName: 'short'
                                })
                                )}
                                </div>
                                <hr />
                                <div><strong>Observation: </strong>
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
                                </div>
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
