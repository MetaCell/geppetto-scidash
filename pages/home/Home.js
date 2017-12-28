define(function (require) {

    var React = require('react');
    var TestInstances = require('../../components/TestInstances')
    var Link = require('react-router-dom').Link;
    var home = React.createClass({

        render() {
            return (
                <div>
                    <TestInstances/>
                </div>
            );
        }
    });

    return home;
});
