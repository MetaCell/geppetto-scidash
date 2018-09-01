import React from 'react';
import ScoreApiService from './api/ScoreApiService';
import RaisedButton from 'material-ui/RaisedButton';
import TestInstancesGriddleAdapter from '../shared/adapter/TestInstancesGriddleAdapter';
import TestSuitesGriddleAdapter from '../shared/adapter/TestSuitesGriddleAdapter';
import Helper from '../shared/Helper';


export default class InitialStateService {

    initialStateTemplate = {
        global: {
            globalFilters: {},
        },
        testInstances: {
            data: [
                {
                    name: " ",
                    score_type: " ",
                    _sort_key: 0,
                    score: {},
                    test_class: " ",
                    model: {},
                    hostname: " ",
                    build_info: " ",
                    timestamp: " ",
                    _timestamp: " "
                }
            ],
            filters: {},
            showLoading: false,
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

    loadScores(filters){

        let service = new ScoreApiService();
        service.clearFilters();

        if (filters !== null){
            for (let filterName of Object.keys(filters)){
                service.setupFilter(filterName, filters[filterName]);
            }
        }

        return service.getList(!Object.keys(filters).length);
    }

    getInitialStateTemplate(){
        return this.initialStateTemplate
    }

    getInitialState(){
        return this.initialState === null ? this.getInitialStateTemplate() : this.initialState;
    }

    generateInitialState(onStateGenerated){
        this.initialState = this.getInitialState()

        let filtersFromUrl = new Helper().queryStringToDict(location.search)

        this.loadScores(filtersFromUrl).then((scores) => {

            this.initialState.testInstances.data = new TestInstancesGriddleAdapter()
                .setup(scores)
                .getGriddleData();

            this.initialState.testSuites.data = new TestSuitesGriddleAdapter()
                .setup(scores)
                .getGriddleData();

            onStateGenerated(this.initialState);

        });
    }
}
