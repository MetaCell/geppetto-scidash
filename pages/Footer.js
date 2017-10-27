define(function (require) {

    var React = require('react');
    var Link = require('react-router-dom').Link;

    var footer = React.createClass({
        render() {
            return (
                <div id="footer-hm">
                    This is the footer
                </div>
            );
        }
    });

    return footer;
});
