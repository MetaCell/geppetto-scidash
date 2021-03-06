import React from 'react';

class ScoreDetailsPartial extends React.Component{
    constructor(props, context) {
        super(props, context)

        this.props = props;
    }
}

export class Observation extends ScoreDetailsPartial{
    render() {
        return (
            <span>
                <a target='_blank' href={this.props.observation.get('url')}>{this.props.observation.get('url')}</a>
                <ul>
                    <li>mean: {this.props.observation.get('mean')}</li>
                    <li>std: {this.props.observation.get('std')}</li>
                </ul>
            </span>
        )
    }
}

export class BuildInfoLine extends ScoreDetailsPartial {
    render() {
        return (
            <span><i className={`fa ${this.props.iconClass}`}></i> {this.props.buildInfo}</span>
        )
    }
}
