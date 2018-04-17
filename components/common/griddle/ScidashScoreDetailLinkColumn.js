import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ScoreDetails from '../../ScoreDetails';
import Helper from '../../../common/Helper';

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
        this.helper = new Helper();
        this.state = {
            open: false,
            scoreObject: new Map(),
            colorBlind: false
        };
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
                    background: this.helper.getBackground(this.state.scoreObject.get("sort_key"), this.state.colorBlind),
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
                    autoScrollBodyContent={true}
                    contentStyle={{
                        width: "830px",
                        maxWidth: "none"
                    }}
                    open={this.state.open}
                >
                    <ScoreDetails scoreInstance={this.state.scoreObject} colorBlind={this.state.colorBlind}/>
                </Dialog>
            </div>
        </div>
        );
    }
}
