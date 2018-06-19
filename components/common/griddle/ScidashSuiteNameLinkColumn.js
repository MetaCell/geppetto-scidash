import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Helper from '../../../common/Helper';
import ScoreMatrix from './../../ScoreMatrix';

const customContentStyle = {
    width: '900px',
    height: '900px'
};

export default class ScidashScoreDetailLinkColumn extends React.Component {
    constructor(props, context){
        super(props, context)
        this.props = props;
        this.openScoreMatrix = this.openScoreMatrix.bind(this);
        this.closeScoreMatrix = this.closeScoreMatrix.bind(this);
        this.helper = new Helper();
        this.state = {
            open: false,
            colorBlind: false
        };
    }

    componentDidMount(){
        this.setState({
            colorBlind: this.props.parent.state.colorBlind
        })
    }

    componentWillReceiveProps(nextProps, nextState){
        this.setState({
            colorBlind: this.props.parent.state.colorBlind
        });
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
                    <ScoreMatrix suite={this.props.value} colorBlind={this.state.colorBlind}/>
                </Dialog>
            </div>
        );
    }
}

