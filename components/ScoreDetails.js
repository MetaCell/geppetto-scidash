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
            scoreInstance: props.scoreInstance,
            colorBlind: props.colorBlind
        };
    }

    getBuildInfoWithIcon(build_info){
        // Separating build info into 3 parts.
        // First is any symbol and number - (.+)
        // Than slash is going, but we have to add backslash cause slash in regex is reserved - (\/)
        // And then actually what we searching for, name of the system, just a regular word - (\w+)
        //
        // Example source data - Darwin-17.5.0-x86_64-i386-64bit/Darwin
        // Result example - ["Darwin-17.5.0-x86_64-i386-64bit", "/", "Darwin"]

        let buildInfoRegex = /(.+)(\/)(\w+)/;
        let buildInfoResult = null;
        let iconClass = "";

        if (buildInfoRegex.test(build_info)){
            buildInfoResult = buildInfoRegex.exec(build_info)
            iconClass = this.helper.getOSIconClass(buildInfoResult[3])
        }

        return (<span><i className={`fa ${iconClass}`}></i> {build_info}</span>)
    }

    render(){
        let modelInstance = this.state.scoreInstance.get("model_instance");

        return (
            <Card>
                <CardText style={{
                    wordWrap: "break-word",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "flex-start"
                }}>
                    <div style={{minWidth: "350px", margin: "15px"}}>
                        <h4 style={{
                            maxWidth: "360px"
                        }}>{this.state.scoreInstance.get("test_instance").get("test_class").get("class_name") + " details"}</h4>
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
                                            background: this.helper.getBackground(this.state.scoreInstance.get("sort_key"), this.state.colorBlind),
                                            color: "white",
                                            padding:"1px"
                                        }}>{this.state.scoreInstance.get("score").toFixed(3)}</span>
                                    )}
                                </div>
                                <div><strong>Normalized score: </strong>
                                    {this.helper.isEmptyString(this.state.scoreInstance.get("sort_key")) ? (
                                        "None"
                                    ): (
                                        <span style={{
                                            background: this.helper.getBackground(this.state.scoreInstance.get("sort_key"), this.state.colorBlind),
                                            color: "white",
                                            padding:"1px"
                                        }}>{this.state.scoreInstance.get("sort_key").toFixed(2)}</span>
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
                                    {this.helper.isEmptyString(this.state.scoreInstance.get("test_instance").get("build_info")) ? (
                                        "None"
                                    ): (
                                        this.getBuildInfoWithIcon(this.state.scoreInstance.get("test_instance").get("build_info"))
                                    )}
                                </div>
                                <div><strong>Hostname: </strong>
                                {this.helper.isEmptyString(this.state.scoreInstance.get("test_instance").get("hostname")) ? (
                                    "None"
                                ): (
                                    this.state.scoreInstance.get("test_instance").get("hostname")
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
                                        <a target='_blank' href={this.state.scoreInstance.get("test_instance").get("observation").get("url")}>{this.state.scoreInstance.get("test_instance").get("observation").get("url")}</a>
                                        <ul>
                                            <li>mean: {this.state.scoreInstance.get("test_instance").get("observation").get("mean")}</li>
                                            <li>std: {this.state.scoreInstance.get("test_instance").get("observation").get("std")}</li>
                                        </ul>
                                    </span>
                                    )
                                )}
                                </div>
                                <div><strong>Simulator: </strong>
                                {this.helper.isEmptyString(this.state.scoreInstance.get("model_instance").get("backend")) ? (
                                    "None"
                                ): (
                                    this.state.scoreInstance.get("model_instance").get("backend")
                                )}
                                </div>
                            </CardText>
                        </Card>
                    </div>
                    <div style={{ wordWrap: "break-word", minWidth:"350px", margin:"15px" }}>
                        <h4>Model details</h4>
                        <ModelDetails modelInstance={modelInstance} />
                    </div>
                </CardText>
            </Card>
        );

    }
}
