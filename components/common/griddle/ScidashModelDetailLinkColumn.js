import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import ModelDetails from '../../ModelDetails';

const customContentStyle = {
    width: '900px',
    height: '900px'
};

export default class ScidashModelDetailLinkColumn extends React.Component {
    constructor(props, context){
        super(props, context)
        this.props = props;
        this.openModelDetail = this.openModelDetail.bind(this);
        this.closeModelDetail = this.closeModelDetail.bind(this);
        this.state = {
            open: false,
            modelInstanceObject: new Map()
        };
    }

    componentDidMount(){
        this.setState({
            modelInstanceObject: this.props.value
        })
    }

    componentWillReceiveProps(nextProps, nextState){
        this.setState({
            modelInstanceObject: nextProps.value
        });
    }

    openModelDetail(e){
        e.preventDefault()
        this.setState({
            open:true
        });
    }

    closeModelDetail(e){
        e.preventDefault()
        this.setState({
            open:false
        });
    }

    render(){
        const actions = [
            <FlatButton
            label="Close"
            primary={true}
            onClick={this.closeModelDetail}
            />,
        ];

        let className = "";
        let modelObject = {};
        let instanceName = "";

        if (typeof this.state.modelInstanceObject.get("model_class") != "undefined"){
            modelObject = this.state.modelInstanceObject.get("model_class");
            className = modelObject.get("class_name");
            instanceName = this.state.modelInstanceObject.get("name");
        }

        return (
                <div>
                    <a
                        onClick={this.openModelDetail}
                        style={{
                            cursor: "pointer"
                        }}
                    >{className} {instanceName && `(${instanceName})`}</a>
                    <Dialog
                        title={className + " details"}
                        actions={actions}
                        modal={true}
                        contentStyle={customContentStyle}
                        open={this.state.open}
                    >
                        <ModelDetails modelInstance={this.state.modelInstanceObject} />
                    </Dialog>
                </div>
            );
    }
}
