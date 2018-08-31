import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Helper from '../../../shared/Helper';

export default class ModelDetails extends React.Component {

    constructor(props, context){
        super(props, context);

        this.helper = new Helper();

        this.state = {
            modelInstance: props.modelInstance
        };
    }


    render(){

        const capabilities = this.state.modelInstance.get("model_class")
            .get("capabilities").map((capability) => {
                return <li key={capability.get("id")}>{capability.get("class_name")}</li>;
        });

        let runParamsObj = Array.from(this.state.modelInstance.get("run_params")).reduce((obj, [key, value]) => (
            Object.assign(obj, { [key]: value }) // Be careful! Maps can have non-String keys; object literals can't.
        ), {});

        const params = Object.entries(runParamsObj).map((param) => {
                return <tr key={param[0]}>
                        <td>{param[0]}</td>
                        <td>{param[1]}</td>
                    </tr>;
        });

        return (
            <Card>
                <CardText>
                    <p><strong>Class name: </strong>
                        {this.helper.isEmptyString(this.state.modelInstance.get("model_class").get("class_name")) ? (
                            "None"
                        ): (
                            this.state.modelInstance.get("model_class").get("class_name")
                        )}
                    </p>
                    <p><strong>Class source: </strong>
                        {this.helper.isEmptyString(this.state.modelInstance.get("model_class").get("url")) ? (
                            "None"
                        ): (
                            <a target='_blank' className="model-url" href={this.state.modelInstance.get("model_class").get("url")}>{this.state.modelInstance.get("model_class").get("url")}</a>
                        )}
                    </p>
                    <p>
                        <strong>
                            Class capabilities:
                        </strong>
                    </p>
                    <ul>
                        {capabilities.size == 0 ? "None": capabilities}
                    </ul>
                    <p><strong>Instance name: </strong>
                        {this.helper.isEmptyString(this.state.modelInstance.get("name")) ? (
                            "None"
                        ): (
                            this.state.modelInstance.get("name")
                        )}
                    </p>
                    <p><strong>Instance source: </strong>
                        {this.helper.isEmptyString(this.state.modelInstance.get("url")) ? (
                            "None"
                        ): (
                            <a target='_blank' className="model-url" href={this.state.modelInstance.get("url")}> {this.state.modelInstance.get("url")}</a>
                        )}
                    </p>
                    <p><strong>Instance - Run parameters: </strong>
                    </p>
                    <table className="table">
                        <tbody>
                            {params.length == 0 ? (
                                <tr>
                                    <td>None</td>
                                </tr>
                            ) : (params)}
                        </tbody>
                    </table>
                </CardText>
            </Card>
        );
    }
}

