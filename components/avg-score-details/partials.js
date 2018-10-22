import React from "react";
import Helper from "../../shared/Helper";

const AvgScoreTableColumns = ({ scoreList, colorBlind, selectedScore, modelName, toggleScoreDetails }) => {
    let helper = new Helper()

    return (
        <tbody>
            <tr>
                <td>{modelName}</td>
                {
                    scoreList.map((item, index) => {
                        return <td style={{
                            background: helper.getBackground(item.get("sort_key"), colorBlind),
                            color: "#fff",
                            fontStyle: selectedScore == item.get("id") ? "italic" : "normal",
                            textDecoration: selectedScore == item.get("id") ? "underline" : "none",
                            borderBottom: selectedScore == item.get("id") ? "2px solid black" : "none"
                        }} key={"score-" + item.get("id")}>

                        <a onClick={() => toggleScoreDetails(item)} style={{
                            cursor: "pointer",
                            color: "white"
                        }}>{item.get("sort_key").toFixed(2)}</a>
                    </td>})
                }
            </tr>
        </tbody>
    );
}

const AvgScoreTableHeadings = ({scoreList, selectedScore }) => {

    return (
        <thead>
            <tr>
                <td></td>
                {scoreList.map((item, index) => {
                    return <th className="avg-score-heading" key={"heading-" + item.get("id")} style={{
                        fontStyle: selectedScore == item.get("id") ? "italic" : "normal",
                        textDecoration: selectedScore == item.get("id") ? "underline" : "none"
                    }}>{item.get("test_instance").get("test_class").get("class_name")}</th>;
                })}
            </tr>
        </thead>
    )
}

export {
    AvgScoreTableColumns,
    AvgScoreTableHeadings
}
