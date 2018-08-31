import React from 'react';
import ScoreApiService from './api/ScoreApiService';
import RaisedButton from 'material-ui/RaisedButton';
import TestInstancesAdapter from '../shared/TestInstancesAdapter';


export default class InitialStateService {

    initialStateTemplate = {
        globalFilters: {},
        testInstances: {
            data: [],
            filters: {},
            autoCompleteData: {
                name: [],
                score: [],
                score_type: [],
                _sort_key: [],
                test_class: [],
                model: [],
                hostname: [],
                owner: [],
                build_info: [],
                timestamp: [],
                _timestamp: []
            }
        },
        testSuites: {
            data: [],
            filters: {},
            autoCompleteData: {
                suiteObject: [],
                avgScore: [],
                testsCount: [],
                model: [],
                timestamp: [],
                _timestamp: []
            }
        },
        header: {
            testsActive: true,
            suitesActive: false,
            showSettings: false,
            colorBlind: false
        }
    }

    initialState = null;

    loadScores(filters = {}){
        return new Promise((resolve, reject) => {
            new ScoreApiService().getList(filters)
                .then((result) => result.json())
                .then((result) => {
                    let scoreData = [];
                    let adapter = new TestInstancesAdapter()
                    adapter.setup(result)
                    scoreData = adapter.getTableData()

                    resolve(scoreData)
                });
        })
    }

    getInitialState(){
        return this.initialState === null ? this.initialStateTemplate : this.initialState;
    }

    generateInitialState(onStateGenerated){
        this.initialState = this.initialStateTemplate;

        this.loadScores().then((scoreData) => {

            this.initialState.testInstances.data = scoreData;
            onStateGenerated(this.initialState);

        });
    }

}
