import Config from "../shared/Config";
import DateRangeApiService from "./api/DateRangeApiService";
import FilteringService from "./FilteringService";
import GlobalInitialStateService from "./state/GlobalInitialStateService";
import UserInitialStateService from "./state/UserInitialStateService";
import ScoreInitialStateService from "./state/ScoreInitialStateService";
import TestSuitesInitialStateService from "./state/TestSuitesInitialStateService";
import TestInstancesInitialStateService from "./state/TestInstancesInitialStateService";
import HeaderInitialStateService from "./state/HeaderInitialStateService";
import ModelsInitialStateService from "./state/ModelsInitialStateService";
import ModelClassInitialStateService from "./state/ModelClassInitialStateService";
import TestClassInitialStateService from "./state/TestClassInitialStateService";
import PagesService from "./PagesService";

export default class InitialStateService {

    initialStateTemplate = {
      global: new GlobalInitialStateService().getInitialStateTemplate(),
      user: new UserInitialStateService().getInitialStateTemplate(),
      scores: new ScoreInitialStateService().getInitialStateTemplate(),
      testSuites: new TestSuitesInitialStateService().getInitialStateTemplate(),
      testInstances: new TestInstancesInitialStateService().getInitialStateTemplate(),
      header: new HeaderInitialStateService().getInitialStateTemplate(),
      models: new ModelsInitialStateService().getInitialStateTemplate(),
      modelClasses: new ModelClassInitialStateService().getInitialStateTemplate(),
      testClasses: new TestClassInitialStateService().getInitialStateTemplate(),
      scheduler: {
        choosedTests: [],
        choosedModels: []
      }
    }

    initialState = null;

    static instance = null;

    static getInstance (){

      if (this.instance === null){
        this.instance = new this();
      }

      return this.instance;
    }

    countPeriod (){
      let dateRangeService = new DateRangeApiService();

      return dateRangeService.getList(true);
    }

    cleanUp (){
      FilteringService.getInstance().deleteFilter("with_suites");
    }

    getInitialStateTemplate (){
      return this.initialStateTemplate;
    }

    getInitialState (){
      return this.initialState === null ? this.getInitialStateTemplate() : this.initialState;
    }

    async generateInitialState (){
      this.initialState = this.getInitialState();
      let filteringS = FilteringService.getInstance();
      let pagesService = new PagesService();

      let suitesNamespace = Config.suitesNamespace;
      let scoresNamespace = Config.scoresNamespace;

      let currentNamespace = pagesService.getCurrentNamespace();

      const period = await this.countPeriod();

      for (let namespace of [suitesNamespace, scoresNamespace]){
        filteringS.setupFilters({
          timestamp_to: period.current_date,
          timestamp_from: period.acceptable_period
        }, namespace, true);
      }

      this.initialState.user = await new UserInitialStateService().generateInitialState();

      if (!this.initialState.user.isLogged){
        filteringS.setupFilters({
          status: "c",
        }, scoresNamespace, false);
      } else {
        filteringS.setupFilters({
          owner: this.initialState.user.userObject.username
        }, scoresNamespace, false);
      }

      filteringS.extractFiltersFromQueryString(location.search, scoresNamespace);
      window.history.pushState("", "", `${location.origin}${location.pathname}?` + filteringS.stringifyFilters(filteringS.getFilters(currentNamespace)));

      this.initialState.scores = await new ScoreInitialStateService().generateInitialState();
      this.initialState.testSuites = await new TestSuitesInitialStateService().generateInitialState();
      this.initialState.models = await new ModelsInitialStateService().generateInitialState();
      this.initialState.testInstances = await new TestInstancesInitialStateService().generateInitialState();
      this.initialState.modelClasses.data = await new ModelClassInitialStateService().generateInitialState();
      this.initialState.testClasses.data = await new TestClassInitialStateService().generateInitialState();
      this.initialState.header = new HeaderInitialStateService().generateInitialState();
      this.initialState.global = new GlobalInitialStateService().getInitialStateTemplate();

      return this.initialState;
    }
}
