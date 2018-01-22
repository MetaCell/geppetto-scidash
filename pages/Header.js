define(function (require) {

    var React = require('react');
    var Link = require('react-router-dom').Link;

    var header = React.createClass({
        render() {
            return (

                <div id="header">
                    <div id="scidash-logo">
                    </div>
                    <div id="headerLinks">
                    </div>
                    <div id="headerSocialLinks">
                        <a target="_blank" href="https://github.com/MetaCell/scidash/tree/development">
                            <i className="fa fa-github fa-2x" aria-hidden="true" />
                        </a>
                    </div>
                </div>

            );
        }
    });

    return header;
});