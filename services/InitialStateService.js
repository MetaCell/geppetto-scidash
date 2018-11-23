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
import FilteringService from '../services/FilteringService';


export default class InitialStateService {

    initialStateTemplate = {
        global: {
            activeView: new PagesService().getDefault()
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
            dateFilterChanged: false,
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
            dateFilterChanged: false,
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
            colorBlind: false,
            drawerActive: false,
            activePage: new PagesService().getDefaultPage()
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

    loadScores(namespace){
        let filteringS = FilteringService.getInstance();
        let service = new ScoreApiService();

        let keys = Object.keys(filteringS.getFilters(namespace, true)).filter(key => !Config.cachableFilters.includes(key))

        return service.getList(!keys.length > 0, namespace);
    }

    cleanUp(){
        FilteringService.getInstance().deleteFilter("with_suites");
    }

    getInitialStateTemplate(){
        return this.initialStateTemplate
    }

    getInitialState(){
        return this.initialState === null ? this.getInitialStateTemplate() : this.initialState;
    }

    generateInitialState(onStateGenerated){
        this.initialState = this.getInitialState()
        let filteringS = FilteringService.getInstance();

        let suiteNamespace = Config.suiteNamespace;
        let instancesNamespace = Config.instancesNamespace;

        this.countPeriod().then((result) => {
            for (let namespace of [suiteNamespace, instancesNamespace]){
                filteringS.setupFilters({
                    timestamp_to: result.current_date,
                    timestamp_from: result.acceptable_period
                }, namespace, true);
            }

            filteringS.extractFiltersFromQueryString(location.search, instancesNamespace);
            window.history.pushState("", "", "/?" + filteringS.stringifyFilters(filteringS.getFilters(instancesNamespace)));

        }).then(() => {
            this.loadScores(instancesNamespace).then((scores) => {

                this.initialState.testInstances.data = new TestInstancesGriddleAdapter(scores)
                    .getGriddleData();

                this.initialState.testInstances.autoCompleteData = new TestInstancesAutocompleteAdapter(this.initialState.testInstances.data)
                    .getAutocompleteData();

                filteringS.setupFilter("with_suites", true, suiteNamespace);

                this.loadScores(suiteNamespace).then((scores) => {

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
