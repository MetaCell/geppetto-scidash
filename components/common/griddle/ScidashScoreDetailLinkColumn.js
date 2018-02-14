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
        this.props = props;
        this.openScoreDetail = this.openScoreDetail.bind(this);
        this.closeScoreDetail = this.closeScoreDetail.bind(this);
        this.state = {
            open: false,
            scoreObject: new Map()
        };
    }

    componentDidMount(){
        this.setState({
            scoreObject: this.props.value
        })
    }

    componentWillReceiveProps(nextProps, nextState){
        this.setState({
            scoreObject: nextProps.value
        });
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

        let score = "";
        let score_type = "";

        if (typeof this.state.scoreObject.get("score") != "undefined"){
            score = this.state.scoreObject.get("score").toFixed(4);
            score_type = this.state.scoreObject.get("score_type");
        }

            return (
                <div style={{textAlign: "right", position:"relative", right: "20px"}}>
                <a
                onClick={this.openScoreDetail}
                style={{
                    cursor: "pointer"
                }}
                >{score}</a>
                <Dialog
                title={score_type + " details"}
                actions={actions}
                modal={true}
                contentStyle={customContentStyle}
                open={this.state.open}
                >
                This is the details of model {score_type}
                </Dialog>
                </div>
            );
    }
}
