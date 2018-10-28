import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import AvgScoreDetailsContainer from '../../avg-score-details/AvgScoreDetailsContainer';
import Helper from '../../../shared/Helper';

export default class ScidashAvgScoreDetailLinkColumn extends React.Component {
    constructor(props, context){
        super(props, context)
        this.props = props;
        this.openAvgScoreDetail = this.openAvgScoreDetail.bind(this);
        this.closeAvgScoreDetail = this.closeAvgScoreDetail.bind(this);
        this.state = {
            open: false,
        };
    }

    openAvgScoreDetail(e){
        e.preventDefault()
        this.setState({
            open:true
        });
    }

    closeAvgScoreDetail(e){
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
            onClick={this.closeAvgScoreDetail}
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
                        onClick={this.openAvgScoreDetail}
                        style={{
                            cursor: "pointer",
                            color: "white"
                        }}
                    >{this.props.avgScore}</a>
                    <Dialog
                        actions={actions}
                        modal={true}
                        autoScrollBodyContent={true}
                        contentStyle={{
                            width: "51%",
                            maxWidth: "none"
                        }}
                        contentClassName="centered-modal"
                        open={this.state.open}
                    >
                    <AvgScoreDetailsContainer scoreList={this.props.scoreList} style={{overflowY: "scroll"}} colorBlind={this.props.colorBlind}/>
                    </Dialog>
                </div>
        </div>
        );
    }
}
