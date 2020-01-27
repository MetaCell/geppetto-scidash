import React from "react";
import Helper from "../../shared/Helper";

const AvgScoreTableColumns = ({ scoreList, colorBlind, selectedScore, modelName, toggleScoreDetails }) => {
  let helper = new Helper()

  return (
    <tbody>
      <tr>
        <td className="modelName-row-heading">{modelName}</td>
        {
          scoreList.map((item, index) => <td style={{
            background: helper.getBackground(item.get("sort_key"), colorBlind),
            color: "#fff",
            fontStyle: selectedScore == item.get("id") ? "italic" : "normal",
            textDecoration: selectedScore == item.get("id") ? "underline" : "none",
            borderBottom: selectedScore == item.get("id") ? "2px solid black" : "none"
          }} key={"score-" + item.get("id")}>

            <a onClick={() => toggleScoreDetails(item)} style={{
              cursor: "pointer",
              padding: "8px",
              margin: "0px",
              color: "white"
            }}>{item.get("sort_key").toFixed(2)}</a>
          </td>)
        }
      </tr>
    </tbody>
  );
}

const AvgScoreTableHeadings = ({ scoreList, selectedScore }) => (
  <thead>
    <tr>
      <td></td>
      {scoreList.map((item, index) => {
        let thDivClassName = "scidash-tilted-titles-table-heading-cell-div";

        if (index >= (scoreList.size - 2)){
          thDivClassName += " last-heading";
        }

        return <th className="scidash-tilted-titles-table-heading-cell" key={"heading-" + item.get("id")}
          style={{
            fontStyle: selectedScore == item.get("id") ? "italic" : "normal",
            textDecoration: selectedScore == item.get("id") ? "underline" : "none"
          }}>
          <div className="scidash-tilted-titles-table-heading-cell-div">
            {item.get("test_instance").get("test_class").get("class_name")}
          </div>
        </th>;
      })}
    </tr>
  </thead>
)

export {
  AvgScoreTableColumns,
  AvgScoreTableHeadings
}
