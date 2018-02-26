import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ScoreDetails from '../../ScoreDetails';

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
            scoreObject: new Map(),
            colorBlind: false
        };
    }

    getBackground(){
        let sortKey = this.state.scoreObject.get("sort_key")
        let sortKeyRounded = null;
        let percents = 0;
        let decreasingValue = 255;
        let growingValue = 255;

        if (typeof sortKey != "undefined"){
            sortKeyRounded = sortKey.toFixed(2);
            percents = sortKeyRounded * 100;
            decreasingValue = Math.floor(255 - (255 / 100 * percents));
            growingValue = Math.floor(255 / 100 * percents);

            if (!this.state.colorBlind){
                if (growingValue > 40)
                    growingValue = growingValue - 20;

                return "rgba("+ decreasingValue +", "+ growingValue +", 0, 1)"
            } else {
                if (decreasingValue > 40)
                    decreasingValue = decreasingValue - 20;

                return "rgba("+ decreasingValue +", "+ decreasingValue +", "+ growingValue +", 1)"
            }
        }

    }

    componentDidMount(){
        this.setState({
            scoreObject: this.props.value,
            colorBlind: this.props.parent.state.colorBlind
        })
    }

    componentWillReceiveProps(nextProps, nextState){
        this.setState({
            scoreObject: nextProps.value,
            colorBlind: this.props.parent.state.colorBlind
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
            score = this.state.scoreObject.get("score").toFixed(3);
            score_type = this.state.scoreObject.get("score_type");
        }

        return (
            <div>
                <div style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    background: this.getBackground(),
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
                    >{score}</a>
                    <Dialog
                        actions={actions}
                        modal={true}
                        contentStyle={{
                            width: "830px",
                            maxWidth: "none"
                        }}
                        open={this.state.open}
                    >
                    <ScoreDetails scoreInstance={this.state.scoreObject} />
                    </Dialog>
                </div>
        </div>
        );
    }
}
