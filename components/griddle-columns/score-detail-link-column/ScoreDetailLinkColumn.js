import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ScoreDetailsContainer from '../../score-details/ScoreDetailsContainer';


export default class ScoreDetailLinkColumn extends React.Component {

    constructor(props, context){
        super(props, context)
        this.props = props;

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
                <div style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    background: this.props.background,
                    bottom: "0px",
                    right: "12px"
                }}>
                </div>
                <div style={{
                    textAlign: "right",
                    position:"relative",
                    right: "20px"
                }}>
                    <a
                        onClick={this.openScoreDetail}
                        style={{
                            cursor: "pointer",
                            color: "white"
                        }}
                    >{this.props.score}</a>
                <Dialog
                    actions={actions}
                    modal={true}
                    autoScrollBodyContent={true}
                    contentStyle={{
                        width: "830px",
                        maxWidth: "none"
                    }}
                    open={this.state.open}
                >
                    <ScoreDetailsContainer score={this.props.scoreObject} colorBlind={this.props.colorBlind}/>
                </Dialog>
            </div>
        </div>
        );
    }
}
