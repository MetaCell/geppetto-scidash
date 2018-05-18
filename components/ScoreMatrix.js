import React from "react";
import {Card, CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';

import BackendService from "../common/BackendService";
import Helper from "../common/Helper";


export default class ScoreMatrix extends React.Component {

    constructor(props, context){
        super(props, context);

        this.props = props;
        this.helper = new Helper();
        this.scores = [];
        this.hiddenModels = [];

        this.state = {
            scoreMatrix: {},
            showLoading: false
        }

        this.showAll = this.showAll.bind(this)
    }

    componentDidMount(){
        this.load(this.props.suite.get("hash"))
    }

    load(hash = false){
        if (!hash)
            return;

        this.setState({
            showLoading: true
        })

        BackendService.score.getAll({
            suite_hash: hash
        }).then((results) => {
            this.setState({
                showLoading: false
            })
            this.scores = results["scores"];
            this.buildMatrix(this.scores);
        })
    }

    hideRow(modelName){
        if (this.hiddenModels.includes(modelName))
            return

        this.hiddenModels = [modelName, ...this.hiddenModels];

        this.buildMatrix(this.scores);
    }

    showAll(){
        this.hiddenModels = [];
        this.buildMatrix(this.scores);
    }

    buildMatrix(scoreList = []){
        let scoreMatrix = {
            rows: {}
        };

        for (let score of scoreList){
            let modelName = score.model_instance.model_class.class_name;
            let testHashId = score.test_instance.hash_id;

            if (this.hiddenModels.includes(modelName)){
                continue;
            }

            if (!(modelName in scoreMatrix.rows))
                scoreMatrix.rows[modelName] = new Map()

            scoreMatrix.rows[modelName].set(testHashId, score);
        }

        let biggestRow = new Map();
        for (let row of Object.values(scoreMatrix.rows)){
            if (row.size > biggestRow.size)
                biggestRow = row;
        }

        if (biggestRow.size > 0){
            scoreMatrix["headings"] = [];

            for (let item of biggestRow.entries()){
                scoreMatrix.headings.push({
                    title: item[1].test_instance.test_class.class_name,
                    id: item[1].test_instance.hash_id
                });
            }
        }

        this.setState({
            scoreMatrix: scoreMatrix
        });
    }

    render(){
        const loader = this.state.showLoading ? <i className="fa fa-cog fa-4x fa-spin centered-modal loading-spinner" style={{
            top:"30%"
        }}></i> : "";

        return (
            <Card>
                <CardText>
                    <table className="table">
                        <thead>
                            <tr>
                                {this.state.scoreMatrix.headings && <th></th>}
                                {this.state.scoreMatrix.headings && this.state.scoreMatrix.headings.map((heading, index) => <th key={index}>{heading.title}</th>)}
                                <th style={{ textAlign: "right" }}>
                                    {this.hiddenModels.length > 0 && <RaisedButton onClick={this.showAll} icon={<FontIcon className="fa fa-eye" style={{ padding: 5 }}/>}/>}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.scoreMatrix.rows && Object.keys(this.state.scoreMatrix.rows).map((key, index) => {
                                return (<tr key={index}>
                                    <td>{key}</td>

                                {this.state.scoreMatrix.headings.map((heading, index) => {

                                    let score = this.state.scoreMatrix["rows"][key].get(heading.id)

                                    if (score != "undefined"){
                                        return (<td
                                            style={{
                                                background: this.helper.getBackground(score.sort_key, this.props.colorBlind),
                                                color: "white"
                                            }}
                                            key={index}>{score.sort_key.toFixed(2)}
                                        </td>);
                                    } else {
                                        return (<td> None </td>);
                                    }
                                })}

                                <td style={{
                                    padding: 0,
                                    textAlign: "right",
                                    width: "10%"
                                }}><i onClick={() => this.hideRow(key)} className="fa fa-eye-slash eye-icon"></i></td>
                        </tr>)
                            })}
                        </tbody>
                    </table>
                    {loader}
                </CardText>
            </Card>
        )
    }
}
