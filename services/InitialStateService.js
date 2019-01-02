import React from 'react';
import ScoresApiService from './api/ScoresApiService';
import DateRangeApiService from './api/DateRangeApiService';
import PagesService from './PagesService';
import RaisedButton from 'material-ui/RaisedButton';
import ScoresGriddleAdapter from '../shared/adapter/ScoresGriddleAdapter';
import TestSuitesGriddleAdapter from '../shared/adapter/TestSuitesGriddleAdapter';
import ScoreMatrixGriddleAdapter from '../shared/adapter/ScoreMatrixGriddleAdapter';
import ScoresAutocompleteAdapter from '../shared/adapter/ScoresAutocompleteAdapter';
import TestSuitesAutocompleteAdapter from '../shared/adapter/TestSuitesAutocompleteAdapter';
import Helper from '../shared/Helper';
import Config from '../shared/Config';
import FilteringService from '../services/FilteringService';


//FIXME: we should do this less fundamental
export default class InitialStateService {

    initialStateTemplate = {
        global: {
            activeView: new PagesService().getDefault()
        },
        scores: {
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
        testInstances: {
            data: [
                { id: 1, name: "test1", class: "class1", tags: ["tag1", "tag2", "deprecated"], owner: "owner1", timestamp: new Date().toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), block: false },
                { id: 1, name: "test1", class: "class1", tags: ["tag1", "tag2", "deprecated"], owner: "owner1", timestamp: new Date().toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), block: false },
                { id: 2, name: "test2", class: "class2", tags: ["tag4", "deprecated", "tag6"], owner: "owner2", timestamp: new Date().toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), block: false },
                { id: 3, name: "test3", class: "class3", tags: ["tag7", "tag8", "tag9"], owner: "owner3", timestamp: new Date().toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), block: true },
                { id: 4, name: "test4", class: "class4", tags: ["deprecated", "tag2", "tag1"], owner: "owner4", timestamp: new Date().toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), block: false },
                { id: 5, name: "test5", class: "class5", tags: ["tag5", "tag2", "tag3"], owner: "owner5", timestamp: new Date().toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), block: true },
                { id: 6, name: "test6", class: "class6", tags: ["tag6", "deprecated", "tag3"], owner: "owner6", timestamp: new Date().toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), block: false }
            ],
            autoCompleteData: {
                name: Array(6).map((v, i) => "test" + i + 1),
                tags: [...Array(6).map((v, i) => "tag" + i + 1), "deprecated"],
                class: Array(6).map((v, i) => "class" + i + 1),
                owner: Array(6).map((v, i) => "owner" + i + 1),
                timestamp: [],
                _timestamp: [],
            },
        },
        header: {
            testsActive: true,
            suitesActive: false,
            showSettings: false,
            colorBlind: false,
            drawerActive: false,
            activePage: new PagesService().getDefaultPage(),
            editModelActive: false,
            editModelActive: false,
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
        let service = new ScoresApiService();

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

                this.initialState.scores.data = new ScoresGriddleAdapter(scores)
                    .getGriddleData();

                this.initialState.scores.autoCompleteData = new ScoresAutocompleteAdapter(this.initialState.scores.data)
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
