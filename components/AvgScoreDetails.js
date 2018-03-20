import React from "react";
import {Card, CardText} from "material-ui/Card";
import Helper from "../common/Helper";
import ModelDetails from "./ModelDetails";

export default class ScoreDetails extends React.Component {

    constructor(props, context){
        super(props, context);

        this.helper = new Helper();

        this.props = props;

        this.state = {
            scoreList: this.props.scoreList
        }
    }

    render(){

        let modelName = "";

        if (typeof this.state.scoreList != "unedfined"){
            modelName = this.state.scoreList.get(0).get('model_instance').get('model_class').get('class_name');
        }

        const columns = this.state.scoreList.map((item, index) => {
            return <td style={{
                background: this.helper.getBackground(item.get("sort_key")),
                color: "#fff"
            }} key={"score-" + item.get("id")}>{item.get("sort_key").toFixed(2)}</td>;
        });
        const headings = this.state.scoreList.map((item, index) => {
            return <td key={"heading-" + item.get("id")}>{item.get("test_instance").get("test_class").get("class_name")}</td>;
        });

        return (
            <Card>
                <CardText>
                    <table className="table">
                        <thead>
                            <tr>
                                <td></td>
                                {headings}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{modelName}</td>
                                {columns}
                            </tr>
                        </tbody>
                    </table>
                </CardText>
            </Card>
        );
    }
}

