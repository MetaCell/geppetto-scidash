import React from "react";
import BackendService from "../common/BackendService";
import Helper from "../common/Helper";


export default class ScoreMatrix extends React.Component {

    constructor(props, context){
        super(props, context);

        this.props = props;
        this.helper = new Helper();

        this.state = {
            scoreMatrix: {}
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

    buildMatrix(scoreList = []){
        let scoreMatrix = {
            headings: {},
            rows: {}
        };

        for (let score of scoreList){
            scoreMatrix.headings[score.test_instance.id] = score.test_instance.test_class.class_name;
            let modelName = score.model_instance.model_class.class_name;
            let testName = score.test_instance.test_class.class_name;

            if (!(modelName in scoreMatrix.rows))
                scoreMatrix.rows[modelName] = new Map()

            if (!(scoreMatrix.rows[modelName].has(`${testName.replace(" ", "_")}_${score.id}`)))
                scoreMatrix.rows[modelName].set(`${testName.replace(" ", "_")}_${score.id}`, null);

            scoreMatrix.rows[modelName].set(`${testName.replace(" ", "_")}_${score.id}`, score.sort_key);
        }

        this.setState({
            scoreMatrix: scoreMatrix
        });
    }

    render(){
        console.log(this.state);
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        {this.state.scoreMatrix.headings && Object.values(this.state.scoreMatrix.headings).map((heading, index) => <th key={index}>{heading}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {this.state.scoreMatrix.rows && Object.keys(this.state.scoreMatrix.rows).map((key, index) => {
                        return (<tr key={index}>
                            <td>{key}</td>
                        {[...this.state.scoreMatrix.rows[key]].map((score, index) => <td style={{
                            background: this.helper.getBackground(score[1], this.props.colorBlind),
                            color: "white"
                        }} key={score[0]}>{score[1].toFixed(2)}</td> )}
                        </tr>)
                    })}
                </tbody>
            </table>
        )
    }
}

