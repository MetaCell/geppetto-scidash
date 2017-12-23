define(function (require) {

    var React = require('react');
    var BackendService = require('../common/BackendService');


    return class Example extends React.Component {

        constructor(props) {
            super(props);
            this.state = {

            };
        }

        componentDidMount() {
            this.ExampleWS();
        }

        ExampleWS() {
            console.log(BackendService.score);
            BackendService.score.getAll()
                .then(( results ) => {
                    this.setState({ scores: results.scores })
                });
            BackendService.testInstance.getAll()
                .then(( results ) => {
                    this.setState({ testInstances: results.testInstances })
                });
            BackendService.testClass.getAll()
                .then(( results ) => {
                    this.setState({ testClasses: results.testClasses })
                });
            BackendService.testSuite.getAll()
                .then(( results ) => {
                    this.setState({ testSuites: results.testSuites })
                });
            BackendService.modelClass.getAll()
                .then(( results ) => {
                    this.setState({ modelClasses: results.modelClasses })
                });
            BackendService.modelInstance.getAll()
                .then(( results ) => {
                    this.setState({ modelInstancees: results.modelInstancees })
                });
            BackendService.capability.getAll()
                .then(( results ) => {
                    this.setState({ capabilities: results.capabilities })
                });
        }

        render() {
            console.log(this.state)
            if (typeof this.state.scores !== 'undefined') {
                const scores = this.state.scores.map((score, i) => (
                    <div key={i}>
                        <h3>{score.score}</h3>
                        <span>{score.model_instance.model_class.class_name}</span>
                    </div>
                ));



                return (
                    <div>
                        Example items:
                    {scores}
                    </div>
                )
            }
            return null;
        }
    };
});
