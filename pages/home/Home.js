define(function (require) {

    var React = require('react');
    var Example = require('../../components/Example')
    var Link = require('react-router-dom').Link;
    var home = React.createClass({

        render() {
            return (
                <div>
                    <Example />
                    <div>
                        HOME PAGE
                    </div>
                    <div>
                        <Link to='/other'>Other</Link>
                    </div>
                </div>

            );
        }
    });

    return home;
});
