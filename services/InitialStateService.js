import React from 'react';
import ScoreApiService from './api/ScoreApiService';
import DateRangeApiService from './api/DateRangeApiService';
import PagesService from './PagesService';
import RaisedButton from 'material-ui/RaisedButton';
import TestInstancesGriddleAdapter from '../shared/adapter/TestInstancesGriddleAdapter';
import TestSuitesGriddleAdapter from '../shared/adapter/TestSuitesGriddleAdapter';
import ScoreMatrixGriddleAdapter from '../shared/adapter/ScoreMatrixGriddleAdapter';
import TestInstancesAutocompleteAdapter from '../shared/adapter/TestInstancesAutocompleteAdapter';
import TestSuitesAutocompleteAdapter from '../shared/adapter/TestSuitesAutocompleteAdapter';
import Helper from '../shared/Helper';
import Config from '../shared/Config';


export default class InitialStateService {

    initialStateTemplate = {
        global: {
            globalFilters: {},
            dateFilterChanged: false,
            currentPage: new PagesService().getDefault()
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
            data: [
                {
                    suiteObject: " ",
                    avgScore: [],
                    testsCount: "",
                    model: {},
                    timestamp: " ",
                    _timestamp: " "
                }
            ],
            scoreMatrixTableDataList: {},
            scoreMatrixList: {},
            hiddenModels:[],
            filters: {},
            showLoading: false,
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

    static instance = null;

    static getInstance(){

        if (this.instance === null){
            this.instance = new this();
        }

        return this.instance;
    }

    countPeriod(){
        let dateRangeService = new DateRangeApiService();

        return dateRangeService.getList(true);
    }

    loadScores(filters){

        let service = new ScoreApiService();
        service.clearFilters();

        if (filters !== null){
            for (let filterName of Object.keys(filters)){
                service.setupFilter(filterName, filters[filterName]);
            }
        }

        let keys = Object.keys(filters).filter(key => !Config.cachableFilters.includes(key))

        return service.getList(!keys.length > 0);
    }

    cleanUp(){
        let service = new ScoreApiService();
        service.deleteFilter("with_suites");
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

        this.countPeriod().then((result) => {
            this.initialState.global.globalFilters = {
                timestamp_from: result.acceptable_period,
                timestamp_to: result.current_date
            };
        }).then(() => {
            this.loadScores({
                ...this.initialState.global.globalFilters,
                ...filtersFromUrl
            }).then((scores) => {

                this.initialState.testInstances.data = new TestInstancesGriddleAdapter(scores)
                    .getGriddleData();

                this.initialState.testInstances.autoCompleteData = new TestInstancesAutocompleteAdapter(this.initialState.testInstances.data)
                    .getAutocompleteData();

                this.loadScores({
                    ...this.initialState.global.globalFilters,
                    ...filtersFromUrl,
                    with_suites: true
                }).then((scores) => {

                    this.initialState.testSuites.data = new TestSuitesGriddleAdapter(scores)
                        .getGriddleData();

                    this.initialState.testSuites.autoCompleteData = new TestSuitesAutocompleteAdapter(this.initialState.testSuites.data)
                        .getAutocompleteData();

                    let scoreMatrixAdapter = ScoreMatrixGriddleAdapter.getInstance(scores)

                    this.initialState.testSuites.scoreMatrixTableDataList = scoreMatrixAdapter
                        .setHiddenModels([])
                        .getGriddleData()

                    this.initialState.testSuites.scoreMatrixList = scoreMatrixAdapter
                        .getScoreMatrix()

                    this.cleanUp()

                    onStateGenerated(this.initialState);
                });
            });
        });
    }
}
