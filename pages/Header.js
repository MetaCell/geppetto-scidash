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
            top: 25,
            right: 80,
            fontSize: 26
        }

        this.settingsPopupStyle = {
            position: "absolute",
            top: 0,
            right: 95,
            width: 150,
            zIndex: 100
        }

        this.buttonsStyle = {
            position: "relative",
            left: 62,
            minWidth: 270
        }

        this.toggleSettings = this.toggleSettings.bind(this);
        this.wrapSettingsRef = this.wrapSettingsRef.bind(this);
        this.handleClickOutsideSettings = this.handleClickOutsideSettings.bind(this);
    }

    componentDidMount(){
        let pages = new URLSearchParams(location.search);
        let currentPage = null;

        for (let page of pages) {
            if (page[0] == "page")
                currentPage = page[1].toLowerCase();
        }

        if (currentPage != null){
            if (currentPage == "tests")
                this.openTestsPage()

            if (currentPage == "suites")
                this.openSuitesPage()

        }

        document.addEventListener('mousedown', this.handleClickOutsideSettings);
        GEPPETTO.on(Scidash.COLOR_MAP_TOGGLED, this.saveColorMapState, this)
    }

    componentWillUnmount(){
        document.removeEventListener('mousedown', this.handleClickOutsideSettings);
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

    handleClickOutsideSettings(event){
        if (this.wrapperSettings && !this.wrapperSettings.contains(event.target)) {
            this.setState({
                showSettings: false
            })
        }
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

    wrapSettingsRef(node){
        this.wrapperSettings = node;
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
                <div id="headerSocialLinks" style={this.headerLinksStyle} ref={this.wrapSettingsRef}>
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
