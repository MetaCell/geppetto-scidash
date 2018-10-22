import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Helper from '../../../shared/Helper';
//import ScoreMatrix from './../../ScoreMatrix';

export default class ScidashSuiteNameLinkColumn extends React.Component {
    constructor(props, context){
        super(props, context)
        this.props = props;
        this.openScoreMatrix = this.openScoreMatrix.bind(this);
        this.closeScoreMatrix = this.closeScoreMatrix.bind(this);
        this.state = {
            open: false
        };
    }

    openScoreMatrix(e){
        e.preventDefault()
        this.setState({
            open:true
        });
    }

    closeScoreMatrix(e){
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
            onClick={this.closeScoreMatrix}
        />,
        ];

        return (
            <div>
                <a
                    onClick={this.openScoreMatrix}
                    style={{
                        cursor: "pointer",
                        wordWrap: "break-word",
                        paddingRight: "20px"
                    }}
                >{ this.props.value != " " && this.props.value.get("name") }</a>
                <Dialog
                    actions={actions}
                    modal={true}
                    autoScrollBodyContent={true}
                    contentStyle={{
                        width: "80%",
                        maxWidth: "none"
                    }}
                    contentClassName="centered-modal"
                    open={this.state.open}
                >
                </Dialog>
            </div>
        );
    }
}


