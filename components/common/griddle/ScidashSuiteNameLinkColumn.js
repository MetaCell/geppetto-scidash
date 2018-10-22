import React from 'react';
import Dialog from 'material-ui/Dialog';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import Helper from '../../../common/Helper';
import ScoreMatrix from './../../ScoreMatrix';
import html2canvas from 'html2canvas';

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
        this.toggleLastColumn = this.toggleLastColumn.bind(this);
        this.takeScreenshot = this.takeScreenshot.bind(this);
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
    
    toggleLastColumn(mode){
        var col;
        var tbl = document.getElementsByClassName("scidash-tilted-titles-table")[0];
        if (tbl != null) {
            col = tbl.getElementsByTagName("tr")[1].getElementsByTagName("td").length-1;

            if (col < 0 || col >= tbl.rows.length) {
                alert("Invalid Column");
                return;
            }

            for (var i = 0; i < tbl.rows.length; i++) {
                for (var j = 0; j < tbl.rows[i].cells.length; j++) {
                    tbl.rows[i].cells[j].style.display = "";
                    if (j == col)
                        tbl.rows[i].cells[j].style.display = mode? "":"none";
                }
            }
        }
    }
    
    takeScreenshot(){
    	var self = this;
        this.toggleLastColumn(false);
        html2canvas(document.querySelector("#table_container_div")).then(function(canvas) {
        	var a = document.createElement('a');
	        // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
	        a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
	        a.download = 'screenshot_table.jpg';
	        a.click();
	        self.toggleLastColumn(true);
        });
    }

    render(){
        const actions = [
        <FlatButton
            label="Screenshot"
            primary={true}
        	icon={<FontIcon className="fa fa-camera"/>}
            onClick={this.takeScreenshot}
        />,
        <FlatButton
            label="Close"
            primary={true}
            onClick={this.closeScoreMatrix}
        />
        ];

        return (
            <div id="modal_dialog">
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
                        width: "75%",
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

