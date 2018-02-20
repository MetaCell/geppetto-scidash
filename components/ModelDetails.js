import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';

export default class ModelDetails extends React.Component {

    constructor(props, context){
        super(props, context);

        this.state = {
            modelInstance: props.modelInstance
        }
    }


    render(){

        const capabilities = this.state.modelInstance.get("model_class")
            .get("capabilities").map((capability) => {
                return <li key={capability.get("id")}>{capability.get("class_name")}</li>;
        })

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
                        {this.state.modelInstance.get("model_class").get("class_name")}
                    </p>
                    <p><strong>Class source: </strong>
                        {this.state.modelInstance.get("model_class").get("url")}
                    </p>
                    <p>
                        <strong>
                            Class capabilities:
                        </strong>
                    </p>
                    <ul>
                        {capabilities}
                    </ul>
                    <p><strong>Instance name: </strong>
                        {this.state.modelInstance.get("name")}
                    </p>
                    <p><strong>Instance source: </strong>
                        {this.state.modelInstance.get("url")}
                    </p>
                    <p><strong>Instance - Run parameters: </strong>
                    </p>
                    <table className="table">
                        <tbody>
                            {params}
                        </tbody>
                    </table>
                </CardText>
            </Card>
        );
    }
}
