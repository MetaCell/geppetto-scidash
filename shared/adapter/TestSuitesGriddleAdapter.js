import BaseAdapter from './BaseAdapter';
import InitialStateService from '../../services/InitialStateService';

export default class TestSuitesGriddleAdapter extends BaseAdapter{

    countAggregateScore(scores){
        let sum = 0;

        for (let score of scores){
            sum += score.sort_key;
        }

        return sum / scores.length;
    }

    getGriddleData(){

        let result = {}

        let options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZone: 'UTC',
            timeZoneName: 'short'
        };

        for (let score of this.getRawData()){
            let suiteHash = score.test_instance.test_suites[0].hash;
            let suiteObject = score.test_instance.test_suites[0];
            let suiteTimestamp = score.test_instance.test_suites[0].timestamp;
            let modelInstanceName = score.model_instance.name;
            let modelSuiteKey = suiteHash + "_" + modelInstanceName;

            if(!(modelSuiteKey in result))
                result[modelSuiteKey] = {};

            result[modelSuiteKey]['suite'] = suiteHash;
            result[modelSuiteKey]['suiteObject'] = suiteObject;
            result[modelSuiteKey]['model'] = score.model_instance;

            if (!('avgScore' in result[modelSuiteKey]))
                result[modelSuiteKey]['avgScore'] = {
                    value: null,
                    scoreList: []
                }

            result[modelSuiteKey]['avgScore']['scoreList'].push(score)
            result[modelSuiteKey]['testsCount'] = result[modelSuiteKey]['avgScore']['scoreList'].length;

            let fullDate = new Date(suiteTimestamp).toLocaleString('en-US', options);
            let shortDate = new Date(suiteTimestamp).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            result[modelSuiteKey]['timestamp'] = {full: fullDate, short: shortDate};
            result[modelSuiteKey]['_timestamp'] = suiteTimestamp;
        }

        let list = Object.values(result)

        for (let item of list){
            item['avgScore']['value'] = this.countAggregateScore(item['avgScore']['scoreList']);
        }

        if (list.length == 0){
            list = new InitialStateService()
                .getInitialStateTemplate()
                .testSuites
                .data;
        }

        return list;

    }
}
