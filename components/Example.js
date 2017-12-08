define(function (require) {

    var React = require('react');


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
            $.get('/api/scores')
                .then(( results ) => this.setState({ scores: results }));
        }

        render() {
            if (typeof this.state.people !== 'undefined') {
                const scores = this.state.scores.map((score, i) => (
                    <div>
                        <h3>{score.score}</h3>
                        <span>{person.model_instance.model_class.class_name}</span>
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
