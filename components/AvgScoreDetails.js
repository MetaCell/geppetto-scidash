import React from "react";
import {Card, CardText} from "material-ui/Card";
import Helper from "../common/Helper";
import ScoreDetails from "./ScoreDetails";

export default class AvgScoreDetails extends React.Component {

    constructor(props, context){
        super(props, context);

        this.helper = new Helper();

        this.props = props;

        this.state = {
            scoreList: this.props.scoreList,
            colorBlind: this.props.colorBlind,
            detailsShowing: false,
            currentScore: null,
            selectedScore: null
        }
        this.updateScoreDetails = this.updateScoreDetails.bind(this);
    }

    updateScoreDetails(score){
        if (this.state.currentScore != score){
            this.setState({
                currentScore: score,
                detailsShowing: true,
                selectedScore: score.get("id")
            });
        } else {
            this.setState({
                currentScore: null,
                selectedScore: null
            });
        }
    }

    toggleScoreDetails(score){
        this.setState({
            detailsShowing: false
        }, () => this.updateScoreDetails(score));
    }

    render(){

        let modelName = "";
        const details = this.state.detailsShowing ? <ScoreDetails scoreInstance={this.state.currentScore} colorBlind={this.state.colorBlind} /> : null;

        if (typeof this.state.scoreList != "unedfined"){
            modelName = this.state.scoreList.get(0).get('model_instance').get('model_class').get('class_name');
        }

        const columns = this.state.scoreList.map((item, index) => {

            return <td style={{
                background: this.helper.getBackground(item.get("sort_key"), this.state.colorBlind),
                color: "#fff",
                fontStyle: this.state.selectedScore == item.get("id") ? "italic" : "normal",
                textDecoration: this.state.selectedScore == item.get("id") ? "underline" : "none",
                borderBottom: this.state.selectedScore == item.get("id") ? "2px solid black" : "none"
            }} key={"score-" + item.get("id")}>

                <a onClick={() => this.toggleScoreDetails(item)} style={{
                    cursor: "pointer",
                    padding: "8px",
                    margin: "0px",
                    color: "white"
                }}>{item.get("sort_key").toFixed(2)}</a>

            </td>;
        });
        const headings = this.state.scoreList.map((item, index) => {
            return <th className="scidash-tilted-titles-table-heading-cell" key={"heading-" + item.get("id")} style={{
                fontStyle: this.state.selectedScore == item.get("id") ? "italic" : "normal",
                textDecoration: this.state.selectedScore == item.get("id") ? "underline" : "none"
            }}>{item.get("test_instance").get("test_class").get("class_name")}</th>;
        });

        return (
            <div>
                <Card style={{
                    width: "auto"
                }}>
                    <CardText style={{
                        overflowX: "scroll"
                    }}>
                        <table className="modal-table scidash-tilted-titles-table">
                            <thead className="griddle-table-heading">
                                <tr>
                                    <td></td>
                                    {headings}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="modelName-row-heading">{modelName}</td>
                                    {columns}
                                </tr>
                            </tbody>
                        </table>
                    </CardText>
                </Card>
                {details}
            </div>
        );
    }
}

