import GriddleAdapter from './GriddleAdapter';
import InitialStateService from '../../services/InitialStateService';

export default class ScoreMatrixGriddleAdapter extends GriddleAdapter{

    hiddenModels = []
    scoreMatrix = {}

    static instance = null;

    static getInstance(rawScores = null){

        if (rawScores === null && this.instance === null){
            throw new AdapterException("Can't return instance, didn't created yet");
        }

        if (this.instance === null){
            this.instance = new this(rawScores);
        }

        return this.instance;
    }


    setHiddenModels(hiddenModels = []){
        this.hiddenModels = hiddenModels;

        return this;
    }

    getScoreMatrix(){
        return this.scoreMatrix;
    }

    buildMatrix(){
        this.scoreMatrix = {
            rows: {},
            headings: [
                {
                    title: "model_name",
                    id: "modelInstanceName"
                }
            ]
        };

        for (let score of this.getScores()){
            let modelInstanceName = score.model_instance.name;
            let modelInstanceId = score.model_instance.id;
            let testHashId = score.test_instance.hash_id;
            let modelKey = `${modelInstanceName}_${modelInstanceId}`;

            if (this.hiddenModels.includes(modelKey)){
                continue;
            }

            if (!(modelKey in this.scoreMatrix.rows))
                this.scoreMatrix.rows[modelKey] = {
                    title: modelInstanceName,
                    info: new Map()
                }

            this.scoreMatrix.rows[modelKey]["info"].set(testHashId, score);
        }

        let biggestRow = new Map();
        for (let row of Object.values(this.scoreMatrix.rows)){
            if (row["info"].size > biggestRow.size)
                biggestRow = row["info"];
        }

        if (biggestRow.size > 0){
            for (let item of biggestRow.entries()){
                this.scoreMatrix.headings.push({
                    title: item[1].test_instance.test_class.class_name,
                    id: item[1].test_instance.hash_id
                });
            }
        }

        this.scoreMatrix.headings.push({
            title: "hide_all",
            id: "hideButtons"
        })

        return this;
    }

    getGriddleData(){
        this.buildMatrix();
        let tableData = [];

        Object.keys(this.getScoreMatrix().rows).map((key, heading) => {
            let rowData = {};

            for (let heading of this.getScoreMatrix().headings){
                if (heading.id != "modelInstanceName")
                    rowData[heading.id] = this.getScoreMatrix()["rows"][key]["info"].get(heading.id);
                else
                    rowData["modelInstanceName"] = this.getScoreMatrix()["rows"][key]["title"];
            }
            rowData["hideButtons"] = key;
            tableData.push(rowData);
        });

        return tableData
    }
}

