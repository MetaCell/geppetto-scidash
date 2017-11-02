define(function (require) {

    var React = require('react');
    var Link = require('react-router-dom').Link;

    var footer = React.createClass({
        render() {
            return (
                <div id="footer-hm">
                    <h1>This is the footer</h1>
                </div>
            );
        }
    });

    return footer;
});
