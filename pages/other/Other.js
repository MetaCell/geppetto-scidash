define(function (require) {

    var React = require('react');
    var Link = require('react-router-dom').Link;
    var home = React.createClass({
        render() {
            return (
                <div>
                    <div>
                        OTHER PAGE
                    </div>
                    <div>
                        <Link to='/'>Home</Link>
                    </div>
                </div>

            );
        }
    });

    return home;
});
