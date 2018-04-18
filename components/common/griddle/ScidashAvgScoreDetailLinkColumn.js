import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import AvgScoreDetails from '../../AvgScoreDetails';
import Helper from '../../../common/Helper';

const customContentStyle = {
    width: '900px',
    height: '900px'
};

export default class ScidashAvgScoreDetailLinkColumn extends React.Component {
    constructor(props, context){
        super(props, context)
        this.props = props;
        this.openAvgScoreDetail = this.openAvgScoreDetail.bind(this);
        this.closeAvgScoreDetail = this.closeAvgScoreDetail.bind(this);
        this.helper = new Helper();
        this.state = {
            open: false,
            data: null,
            colorBlind: false
        };
    }

    componentDidMount(){
        this.setState({
            data: this.props.value,
            colorBlind: this.props.parent.state.colorBlind
        })
    }

    componentWillReceiveProps(nextProps, nextState){
        this.setState({
            data: nextProps.value,
            colorBlind: this.props.parent.state.colorBlind
        });
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


        let score = "";
        let avgScore = "";
        let scoreList = "";

        if (this.state.data !== null){
            if (typeof this.state.data.get('value') != "undefined")
                avgScore = this.state.data.get('value').toFixed(2);
                scoreList = this.state.data.get('scoreList');
        }

        return (
            <div>
                <div style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    background: this.helper.getBackground(parseFloat(avgScore), this.state.colorBlind),
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
                    >{avgScore}</a>
                    <Dialog
                        actions={actions}
                        modal={true}
                        autoScrollBodyContent={true}
                        contentStyle={{
                            width: "1050px",
                            maxWidth: "none"
                        }}
                        contentClassName="centered-modal"
                        open={this.state.open}
                    >
                    <AvgScoreDetails scoreList={scoreList} style={{overflowY: "scroll"}} colorBlind={this.state.colorBlind}/>
                    </Dialog>
                </div>
        </div>
        );
    }
}
