import React from 'react';
import Dialog from 'material-ui/Dialog';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import AvgScoreDetailsContainer from '../../avg-score-details/AvgScoreDetailsContainer';
import Helper from '../../../shared/Helper';
import html2canvas from 'html2canvas';

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
    
    takeScreenshot(){
    	html2canvas(document.querySelector("#table_container_div")).then(function(canvas) {
    		var a = document.createElement('a');
    		// toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
    		a.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    		a.download = 'Average_score_image.png';
    		a.click();
    	});
    }

    render(){
        const actions = [
            <FlatButton
            label="Save As Image"
            primary={true}
            icon={<FontIcon className="fa fa-camera"/>}
            onClick={this.takeScreenshot}
			/>,
            <FlatButton
            label="Close"
            primary={true}
            onClick={this.closeAvgScoreDetail}
            />
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
