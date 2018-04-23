import React from 'react';
import Link from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {Card, CardText} from 'material-ui/Card';

import ColorMapToggle from '../components/common/scidash/ColorMapToggle';

import GEPPETTO from 'geppetto';
import Scidash from '../common/Scidash';


export default class Header extends React.Component {

    constructor(props, context){
        super(props, context)

        this.state = {
            testsActive: true,
            suitesActive: false,
            showSettings: false,
            colorBlind: false
        }

        this.openTestsPage = this.openTestsPage.bind(this)
        this.openSuitesPage = this.openSuitesPage.bind(this)

        this.headerLinksStyle = {
            position: "fixed",
            top: "25px",
            right: "80px",
            fontSize: "26px"
        }

        this.settingsPopupStyle = {
            position: "absolute",
            top: "0px",
            right: "45px",
            width: "150px",
            zIndex: "100"
        }

        this.buttonsStyle = {
            position: "relative",
            left: "62px"
        }

        this.toggleSettings = this.toggleSettings.bind(this);
    }

    componentDidMount(){
        GEPPETTO.on(Scidash.COLOR_MAP_TOGGLED, this.saveColorMapState, this)
    }

    componentWillUnmount(){
        GEPPETTO.off(Scidash.COLOR_MAP_TOGGLED, this.saveColorMapState, this)
    }

    saveColorMapState(){
        this.setState({
            colorBlind: !this.state.colorBlind
        })
    }

    toggleSettings(){
        this.setState({
            showSettings: !this.state.showSettings
        })
    }

    openTestsPage(){
        GEPPETTO.trigger(Scidash.TESTS_PAGE_ACTIVATED, this.state.colorBlind);
        this.setState({
            testsActive: true,
            suitesActive: false
        });
    }

    openSuitesPage(){
        GEPPETTO.trigger(Scidash.SUITES_PAGE_ACTIVATED, this.state.colorBlind);
        this.setState({
            testsActive: false,
            suitesActive: true
        });
    }

    render() {

        if (this.state.showSettings)
            this.settingsPopupStyle['display'] = "block";
        else
            this.settingsPopupStyle['display'] = "none";

        return (
            <div id="header">
                <div id="scidash-logo">
                </div>
                <div id="headerLinks">
                    <div className="row">
                        <div className="col-md-3 col-md-offset-4" style={this.buttonsStyle}>
                                <RaisedButton label="Tests View" primary={this.state.testsActive} onClick={this.openTestsPage} />
                                <RaisedButton label="Suites View" primary={this.state.suitesActive} onClick={this.openSuitesPage} />
                        </div>
                    </div>
                </div>
                <div id="headerSocialLinks" style={this.headerLinksStyle}>
                    <RaisedButton onClick={this.toggleSettings} icon={<FontIcon className="fa fa-cog" style={{ padding: 5 }}/>} />
                    <Card style={this.settingsPopupStyle}>
                        <CardText>
                            <ColorMapToggle />
                        </CardText>
                    </Card>
                </div>
            </div>

        );
    }

}
