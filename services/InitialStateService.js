import React from 'react';
import ScoreApiService from './api/ScoreApiService';
import RaisedButton from 'material-ui/RaisedButton';
import TestInstancesGriddleAdapter from '../shared/adapter/TestInstancesGriddleAdapter';
import TestSuitesGriddleAdapter from '../shared/adapter/TestSuitesGriddleAdapter';
import TestInstancesAutocompleteAdapter from '../shared/adapter/TestInstancesAutocompleteAdapter';
import Helper from '../shared/Helper';


export default class InitialStateService {

    initialStateTemplate = {
        global: {
            globalFilters: { },
            dateFilterChanged: false
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
                    _timestamp: " ",
                    template: true
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
                _timestamp: [],
                template: true
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

    constructor(){

        let dateFrom = new Date();
        let dateTo = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

        dateFrom.setMonth(dateFrom.getMonth() - 6);
        dateFrom.setHours(0, 0, 0, 0);
        dateTo.setHours(0, 0, 0, 0);

        this.initialStateTemplate.global.globalFilters = {
            timestamp_from: dateFrom.toISOString(),
            timestamp_to: dateTo.toISOString()
        };
    }

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

        this.loadScores({
            ...this.initialState.global.globalFilters,
            ...filtersFromUrl
        }).then((scores) => {

            this.initialState.testInstances.data = new TestInstancesGriddleAdapter()
                .setup(scores)
                .getGriddleData();

            this.initialState.testSuites.data = new TestSuitesGriddleAdapter()
                .setup(scores)
                .getGriddleData();

            this.initialState.testInstances.autoCompleteData = new TestInstancesAutocompleteAdapter()
                .setup(this.initialState.testInstances.data)
                .getAutocompleteData();

            onStateGenerated(this.initialState);

        });
    }
}
