define(function (require) {

    var React = require('react');
    var BackendService = require('../common/BackendService');


    return class Example extends React.Component {

        constructor(props) {
            super(props);
            this.state = {

            };
        }

        componentWillMount() {
            this.ExampleWS();
        }

        ExampleWS() {

            BackendService.score.getAll({})
                .then(( results ) => {
                    this.setState({ scores: results.scores })
                });
        }

        render() {
            if (typeof this.state.scores !== 'undefined') {
                const scores = this.state.scores.map((score, i) => (
                    <div>
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
