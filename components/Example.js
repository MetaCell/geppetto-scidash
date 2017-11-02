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
            $.get('/api/people')
                .then(( results ) => this.setState({ people: results }));
        }

        render() {
            if (typeof this.state.people !== 'undefined') {
                const persons = this.state.people.map((person, i) => (
                    <div>
                        <h3>{person.name}</h3>
                        <span>{person.surname}, {person.occupation}</span>
                    </div>
                ));



                return (
                    <div>
                        Example items:
                    {persons}
                    </div>
                )
            }
            return null;
        }
    };
});