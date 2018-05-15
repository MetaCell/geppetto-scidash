import React from "react";
import BackendService from "../common/BackendService";
import Helper from "../common/Helper";


export default class ScoreMatrix extends React.Component {

    constructor(props, context){
        super(props, context);

        this.props = props;
        this.helper = new Helper();

        this.state = {
            scoreMatrix: {},
            hiddenModels: []
        }
    }

    componentDidMount(){
        this.load(this.props.suite.get("hash"))
    }

    load(hash = false){
        if (!hash)
            return;

        BackendService.score.getAll({
            suite_hash: hash
        }).then((results) => {
            this.buildMatrix(results["scores"]);
        })
    }

    hideRow(modelName){
        if (this.state.hiddenModels.includes(modelName))
            return

        this.setState({
            hiddenModels: [modelName, ...this.state.hiddenModels]
        });
    }

    buildMatrix(scoreList = []){
        let scoreMatrix = {
            headings: [],
            rows: {}
        };

        for (let score of scoreList){
            let modelName = score.model_instance.model_class.class_name;
            let testName = score.test_instance.test_class.class_name;

            console.log(this.state);
            if (this.state.hiddenModels.includes(modelName)){
                continue;
            }

            if (!(modelName in scoreMatrix.rows))
                scoreMatrix.rows[modelName] = new Map()

            if (!(scoreMatrix.rows[modelName].has(`${testName.replace(" ", "_")}_${score.id}`)))
                scoreMatrix.rows[modelName].set(`${testName.replace(" ", "_")}_${score.id}`, null);

            scoreMatrix.rows[modelName].set(`${testName.replace(" ", "_")}_${score.id}`, score);
        }

        let biggestRow = new Map();
        for (let row of Object.values(scoreMatrix.rows)){
            if (row.size > biggestRow.size)
                biggestRow = row;
        }

        for (let item of biggestRow.entries()){
            scoreMatrix.headings.push(item[1].test_instance.test_class.class_name);
        }

        this.setState({
            scoreMatrix: scoreMatrix
        });
    }

    render(){
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                    {this.state.scoreMatrix.headings && this.state.scoreMatrix.headings.map((heading, index) => <th key={index}>{heading}</th>)}
                        <th></th>
                </tr>
            </thead>
            <tbody>
                {this.state.scoreMatrix.rows && Object.keys(this.state.scoreMatrix.rows).map((key, index) => {
                    return (<tr key={index}>
                        <td>{key}</td>
                    {[...this.state.scoreMatrix.rows[key]].map((score, index) => <td style={{
                        background: this.helper.getBackground(score[1].sort_key, this.props.colorBlind),
                        color: "white"
                    }} key={score[0]}>{score[1].sort_key.toFixed(2)}</td> )}
                <td style={{padding: 0}}><i onClick={() => this.hideRow(key)} className="fa fa-eye eye-icon"></i></td>
            </tr>)
                })}
            </tbody>
        </table>
        )
    }
}
