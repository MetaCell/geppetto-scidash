import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const customContentStyle = {
    width: '900px',
    height: '900px'
};

export default class ScidashScoreDetailLinkColumn extends React.Component {
    constructor(props, context){
        super(props, context)
        this.scoreObject = props.value;
        this.openScoreDetail = this.openScoreDetail.bind(this);
        this.closeScoreDetail = this.closeScoreDetail.bind(this);
        this.state = {
            open: false,
        };
    }

    openScoreDetail(e){
        e.preventDefault()
        this.setState({
            open:true
        });
    }

    closeScoreDetail(e){
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
            onClick={this.closeScoreDetail}
            />,
        ];

        return (
            <div>
                <a
                    onClick={this.openScoreDetail}
                    style={{
                        cursor: "pointer"
                    }}
                >{this.scoreObject.get('score').toFixed(4)}</a>
                <Dialog
                    title={this.scoreObject.get('score_type') + " details"}
                    actions={actions}
                    modal={true}
                    contentStyle={customContentStyle}
                    open={this.state.open}
                >
                    This is the details of model {this.scoreObject.get('score_type')}
                </Dialog>
            </div>
        );
    }
}
