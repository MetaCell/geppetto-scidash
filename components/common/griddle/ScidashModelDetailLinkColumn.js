import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const customContentStyle = {
    width: '900px',
    height: '900px'
};

export default class ScidashModelDetailLinkColumn extends React.Component {
    constructor(props, context){
        super(props, context)
        this.modelObject = props.value;
        this.openModelDetail = this.openModelDetail.bind(this);
        this.closeModelDetail = this.closeModelDetail.bind(this);
        this.state = {
            open: false,
        };
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

        return (
            <div>
                <a
                    onClick={this.openModelDetail}
                    style={{
                        cursor: "pointer"
                    }}
                >{this.modelObject.get('class_name')}</a>
                <Dialog
                    title={this.modelObject.get('class_name') + " details"}
                    actions={actions}
                    modal={true}
                    contentStyle={customContentStyle}
                    open={this.state.open}
                >
                    This is the details of model {this.modelObject.get('class_name')}
                </Dialog>
            </div>
        );
    }
}
