import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import ModelDetailsContainer from '../../model-details/ModelDetailsContainer';

export default class ModelDetailLinkColumn extends React.Component {

    constructor(props, context){
        super(props, context);
        this.props = props;
        this.state = {
            open: false,
        }
        this.openModelDetail = this.openModelDetail.bind(this)
        this.closeModelDetail = this.closeModelDetail.bind(this)
    }

    openModelDetail(event){
        event.preventDefault();
        this.setState({
            open: true
        })
    }

    closeModelDetail(event){
        event.preventDefault();
        this.setState({
            open: false
        })
    }


    render() {
        const actions = [

        <FlatButton
            label="Close"
            primary={true}
            onClick={this.closeModelDetail}
        />

        ];

        return (
            <div>
                <a
                    onClick={this.openModelDetail}
                    style={{
                        cursor: "pointer"
                    }}
                >{this.props.className} {this.props.instanceName && `(${this.props.instanceName})`}</a>
            <Dialog
                title={this.props.className + " details"}
                actions={actions}
                modal={true}
                contentStyle={this.props.customContentStyle}
                autoScrollBodyContent={true}
                open={this.state.open}
            >
                <ModelDetailsContainer model={this.props.modelInstance} />
            </Dialog>
        </div>
        );
    }
}
