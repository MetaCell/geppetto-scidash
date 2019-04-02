import React from 'react';


export default class Footer extends React.Component {
    render() {
        return (
            <div id="footer-scidash">
                <div id="footerLinks">
                    <a href='/' target='_blank'>Home</a>
                    <a href='https://github.com/MetaCell/scidash-api/tree/development' target="_blank">SciDash API</a>
                    <a href='https://github.com/scidash/sciunit' target="_blank">SciUnit</a>
                    <a href='https://github.com/scidash/neuronunit' target="_blank">NeuronUnit</a>
                    <a href='https://neuroml-db.org/' target="_blank">NeuroML-DB</a>
                </div>
                <div id="footerDate">
                    &copy; 2017-2019 SciDash / Arizona State University<sup>®</sup>
                </div>
            </div>
        );
    }
}
