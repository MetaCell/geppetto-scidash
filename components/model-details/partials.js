import React from 'react';


class ModelDetailsPartial extends React.Component{
    constructor(props, context) {
        super(props, context)

        this.props = props;
    }
}


export class Capabilities extends ModelDetailsPartial{

    render() {
        const capabilities = this.props.capabilities
            .map((capability) => {
                return <li key={capability.get('id')}>{capability.get('class_name')}</li>;
            });

        return (
            <span>
                <ul>
                    {capabilities}
                </ul>
            </span>
        );
    }
}


export class RunParams extends ModelDetailsPartial{

    render() {

        let runParamsObj = Array.from(this.props.runParams).reduce((obj, [key, value]) => (
            Object.assign(obj, { [key]: value }) // Be careful! Maps can have non-String keys; object literals can't.
        ), {});

        const params = Object.entries(runParamsObj).map((param) => {
            return <tr key={param[0]}>
                <td>{param[0]}</td>
                <td>{param[1]}</td>
            </tr>;
        });

        return (
            <table className="table">
                <tbody>
                    {params}
                </tbody>
            </table>
        );
    }
}
