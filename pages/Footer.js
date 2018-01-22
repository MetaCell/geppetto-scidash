define(function (require) {

    var React = require('react');
    var Link = require('react-router-dom').Link;

    var footer = React.createClass({
        render() {
            return (
                <div id="footer-scidash">
                    <div id="footerLinks">
                        <Link to='/'>Home</Link>
                        <a href='https://github.com/MetaCell/scidash-api/tree/development' target="_blank">SciDash API</a>
                        <a href='https://github.com/scidash/sciunit' target="_blank">SciUnit</a>
                        <a href='https://github.com/scidash/neuronunit' target="_blank">NeuronUnit</a>
                        <a href='https://neuroml-db.org/' target="_blank">NeuroML-DB</a>
                    </div>
                    <div id="footerDate">
                        &copy; 2017-2018 SciDash / Arizona State University<sup>®</sup>
                    </div>
                </div>
            );
        }
    });

    return footer;
});