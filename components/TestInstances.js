define(function (require) {

    var React = require('react');
    var BackendService = require('../common/BackendService');
    var ReactDataGrid = require('react-data-grid');


    return class TestInstances extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                testInstances: []
            };

            this.columns = [
                {key: 'id', name: 'ID'},
                {key: 'hostname', name: 'Hostname'}
            ];
        }

        rowGetter(index) {
            return this.state.testInstances[index];
        }

        componentDidMount() {
            this.Init();
        }

        Init() {
            BackendService.testInstance.getAll()
                .then(( results ) => {
                    this.setState({ testInstances: results['test-instances'] })
                });
        }

        render() {
            return  (
                <ReactDataGrid
                columns={this.columns}
                rowGetter={this.rowGetter}
                rowsCount={this.state.testInstances.length}
                minHeight={500} />);
        }
    };
});
