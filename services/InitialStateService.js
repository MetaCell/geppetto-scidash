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
import ModelClassApiService from "./api/ModelClassApiService";

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
      scheduler: {
        data: [
          { type: "tests", name: "My first test", meta: "Rheobase test", id: 0 },
          { type: "models", name: "My first model", meta: "Reduced model", id: 1 },
          { type: "tests", name: "My second test", meta: "VM test", id: 2 },
          { type: "models", name: "My second model", meta: "Reduced model", id: 3 },
          { type: "tests", name: "My third test", meta: "VM test", id: 4 },
          { type: "models", name: "My third model", meta: "Reduced model", id: 5 },
        ],
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

      let suiteNamespace = Config.suiteNamespace;
      let instancesNamespace = Config.instancesNamespace;

      const period = await this.countPeriod();

      for (let namespace of [suiteNamespace, instancesNamespace]){
        filteringS.setupFilters({
          timestamp_to: period.current_date,
          timestamp_from: period.acceptable_period
        }, namespace, true);
      }

      filteringS.extractFiltersFromQueryString(location.search, instancesNamespace);
      window.history.pushState("", "", "/?" + filteringS.stringifyFilters(filteringS.getFilters(instancesNamespace)));

      this.initialState.scores.data = await new ScoreInitialStateService().generateInitialState();
      this.initialState.testSuites.data = await new TestSuitesInitialStateService().generateInitialState();
      this.initialState.models.data = await new ModelsInitialStateService().generateInitialState();
      this.initialState.testInstances.data = await new TestInstancesInitialStateService().generateInitialState();
      this.initialState.modelClasses.data = await new ModelClassInitialStateService().generateInitialState();
      this.initialState.global = new GlobalInitialStateService().getInitialStateTemplate();
      this.initialState.header = new HeaderInitialStateService().getInitialStateTemplate();
      this.initialState.user = new UserInitialStateService().getInitialStateTemplate();

      return this.initialState;
    }
}
