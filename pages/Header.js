import React from 'react';
import Link from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

import ColorMapToggle from '../components/common/scidash/ColorMapToggle';

import GEPPETTO from 'geppetto';
import Scidash from '../common/Scidash';


export default class Header extends React.Component {

    constructor(props, context){
        super(props, context)

        this.state = {
            testsActive: true,
            suitesActive: false
        }

        this.openTestsPage = this.openTestsPage.bind(this)
        this.openSuitesPage = this.openSuitesPage.bind(this)
    }

    openTestsPage(){
        GEPPETTO.trigger(Scidash.TESTS_PAGE_ACTIVATED);
        this.setState({
            testsActive: true,
            suitesActive: false
        });
    }

    openSuitesPage(){
        GEPPETTO.trigger(Scidash.SUITES_PAGE_ACTIVATED);
        this.setState({
            testsActive: false,
            suitesActive: true
        });
    }

    render() {

        return (
            <div id="header">
                <div id="scidash-logo">
                </div>
                <div id="headerLinks">
                    <div className="row">
                        <div className="col-md-3 col-md-offset-4">
                            <RaisedButton label="Tests View" primary={this.state.testsActive} onClick={this.openTestsPage} />
                            <RaisedButton label="Suites View" primary={this.state.suitesActive} onClick={this.openSuitesPage} />
                        </div>
                    </div>
                </div>
                <div id="headerSocialLinks">
                    <ColorMapToggle />
                </div>
            </div>

        );
    }

}
