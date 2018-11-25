import React from 'react';
import TestInstancesContainer from '../../test-instances/TestInstancesContainer';
import TestSuitesContainer from '../../test-suites/TestSuitesContainer';
import PagesService from '../../../services/PagesService';


// import TestsContainer from '../../tests/TestsContainer';
// import ModelsContainer from '../../models/ModelsContainer';
// import Settings from '../../settings/Settings';
// import SchedulingContainer from '../../scheduling/SchedulingContainer';

import DDList from '../../scheduling/DDList'


const draggableData = [ // fake 
  { type: 'tests', name: 'My first test', meta: 'Rheobase test', id: 0 }, 
  { type: 'models', name: 'My first model', meta: 'Reduced model', id: 1 }, 
  { type: 'tests', name: 'My second test', meta: 'VM test', id: 2 },
  { type: 'models', name: 'My second model', meta: 'Reduced model', id: 3 }, 
  { type: 'tests', name: 'My third test', meta: 'VM test', id: 4 }, 
  { type: 'models', name: 'My third model', meta: 'Reduced model', id: 5 },
]

export default class Content extends React.Component {

    constructor(props, context){
        super(props, context);

        this.props = props;

        this.state = {
          tests: [],
          models: []
        }
    }
    drop(dropData){
      
      console.log(dropData)
      if (Object.keys(dropData).indexOf("tests") > -1) {
        console.log("tests:")
        console.log(parseInt(dropData.tests));
        this.setState( ({ tests }) => ({ tests: [ ...tests, parseInt(dropData.tests)] }) )
      }
      else {
        console.log("models:")
        console.log(parseInt(dropData.models));
        this.setState( ({ models }) => ({ models: [ ...models, parseInt(dropData.models)] }) )
      }
    }
    render() {
        let pagesService = new PagesService()

        const { tests, models } = this.state;

        // return <Demo></Demo>
        return (
          <DDList 
            data={draggableData}  
            onDrop={dropData => this.drop(dropData)}
            tests={tests.map(testID => draggableData[testID])}  
            models={models.map(modelID => draggableData[modelID])}
          />
        )
        // if (this.props.activePage == pagesService.SCORES_PAGE && this.props.activeView == pagesService.TESTS_VIEW)
        //     return (
        //         <TestInstancesContainer />
        //     )

        // if (this.props.activePage == pagesService.SCORES_PAGE && this.props.activeView == pagesService.SUITES_VIEW)
        //     return (
        //         <TestSuitesContainer />
        //     )

        // if (this.props.activePage == pagesService.MODELS_PAGE)
        //     return (
        //         <ModelsContainer />
        //     )
        
        // if (this.props.activePage == pagesService.TESTS_PAGE)
        //     return (
        //         <TestsContainer />
        //     )
        
        // if (this.props.activePage == pagesService.SETTINGS_PAGE)
        //     return (
        //         <Settings/>
        //     )

        // if (this.props.activePage == pagesService.SCHEDULING_PAGE)
        //     return (
        //         <SchedulingContainer />
        //     )
    }
}

