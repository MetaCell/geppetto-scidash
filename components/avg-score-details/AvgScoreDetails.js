import React from "react";
import { Card, CardText } from "material-ui/Card";
import ScoreDetails from "../score-details/ScoreDetailsContainer";
import { AvgScoreTableColumns, AvgScoreTableHeadings } from "./partials"

export default class AvgScoreDetails extends React.Component {

  constructor (props, context){
    super(props, context);
    this.state = {
      detailsShowing: false,
      currentScore: null,
      selectedScore: null
    }
    this.updateScoreDetails = this.updateScoreDetails.bind(this);
  }

  updateScoreDetails (score){
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

  toggleScoreDetails (score){
    this.setState({ detailsShowing: false }, () => this.updateScoreDetails(score));
  }

  render (){

    const details = this.state.detailsShowing ? <ScoreDetails score={this.state.currentScore} colorBlind={this.props.colorBlind} /> : null;


    return (
      <div>
        <Card id="table-container-div">
          <CardText style={{ overflowX: "scroll", }}>
            <table className="modal-table scidash-tilted-titles-table">
              <AvgScoreTableHeadings
                scoreList={this.props.scoreList}
                selectedScore={this.state.selectedScore}
              />
              <AvgScoreTableColumns
                scoreList={this.props.scoreList}
                colorBlind={this.props.colorBlind}
                selectedScore={this.state.selectedScore}
                modelName={this.props.modelName}
                toggleScoreDetails={score => this.toggleScoreDetails(score)}
              />
            </table>
          </CardText>
        </Card>
        {details}
      </div>
    );
  }
}


