import BaseAdapter from "./BaseAdapter";
import InitialStateService from "../../services/InitialStateService";

export default class ScoreMatrixGriddleAdapter extends BaseAdapter {
  hiddenModels = [];
  scoreMatrixList = {};

  static instance = null;

  static getInstance (rawScores = null) {
    if (rawScores === null && this.instance === null) {
      throw new AdapterException("Can't return instance, didn't created yet");
    }

    if (this.instance === null) {
      this.instance = new this(rawScores);
    } else if (rawScores){
      this.instance.rawData = rawScores;
    }

    return this.instance;
  }

  setHiddenModels (hiddenModels = []) {
    this.hiddenModels = hiddenModels;

    return this;
  }

  getScoreMatrix () {
    return this.scoreMatrixList;
  }

  buildMatrix () {
    let suiteHashes = new Set();

    for (let score of this.getRawData()) {
      for (let suite of score.test_instance.test_suites){
        suiteHashes.add(suite.hash);
      }
    }

    for (let hash of suiteHashes) {
      let scoreMatrix = {
        rows: {},
        headings: [
          {
            title: "model_name",
            id: "modelInstanceName"
          }
        ]
      };
      for (let score of this.getRawData()) {
        for (let suite of score.test_instance.test_suites){
          if (hash != suite.hash) {
            continue;
          }

          let modelInstanceName = score.model_instance.name;
          let modelInstanceId = score.model_instance.id;
          let testHashId = score.test_instance.hash_id;
          let modelKey = `${modelInstanceName}_${modelInstanceId}`;

          if (this.hiddenModels.includes(modelKey)) {
            continue;
          }

          if (!(modelKey in scoreMatrix.rows)) {
            scoreMatrix.rows[modelKey] = {
              title: modelInstanceName,
              info: new Map()
            };
          }

          scoreMatrix.rows[modelKey]["info"].set(testHashId, score);
        }
      }

      let biggestRow = new Map();
      for (let row of Object.values(scoreMatrix.rows)) {
        if (row["info"].size > biggestRow.size) biggestRow = row["info"];
      }

      if (biggestRow.size > 0) {
        for (let item of biggestRow.entries()) {
          scoreMatrix.headings.push({
            title: item[1].test_instance.test_class.class_name,
            id: item[1].test_instance.hash_id
          });
        }
      }

      scoreMatrix.headings.push({
        title: "hide_all",
        id: "hideButtons"
      });

      this.scoreMatrixList[hash] = scoreMatrix;
    }

    return this;
  }

  getGriddleData () {
    this.buildMatrix();
    let tableData = {};

    for (let hash of Object.keys(this.scoreMatrixList)) {
      let scoreMatrix = this.getScoreMatrix()[hash];

      tableData[hash] = [];

      Object.keys(scoreMatrix.rows).map(key => {
        let rowData = {};

        for (let heading of scoreMatrix.headings) {
          if (heading.id != "modelInstanceName")
          {rowData[heading.id] = scoreMatrix["rows"][key]["info"].get(
            heading.id
          );}
          else rowData["modelInstanceName"] = scoreMatrix["rows"][key]["title"];
        }
        rowData["hideButtons"] = key;
        tableData[hash].push(rowData);

        return tableData;
      });
    }

    return tableData;
  }
}
