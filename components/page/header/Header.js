import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {Card, CardText} from 'material-ui/Card';

import ColorMapToggleContainer from "../../color-map-toggle/ColorMapToggleContainer";


export default class Header extends React.Component {

    constructor(props, context){
        super(props, context);

        this.props = props;
        this.wrapperSettings = null;

        this.wrapSettingsRef = this.wrapSettingsRef.bind(this);
    }

    componentWillMount(){
        document.addEventListener('mousedown', (event) => this.props.handleClickOutsideSettings(this.wrapperSettings, event, this.props.showSettings));
    }

    componentWillUnmount(){
        document.removeEventListener('mousedown', (event) => this.props.handleClickOutsideSettings(this.wrapperSettings, event, this.props.showSettings));
    }

    wrapSettingsRef(node){
        this.wrapperSettings = node;
    }

    render() {

        if (this.props.showSettings)
            this.props.settingsPopupStyle['display'] = "block";
        else
            this.props.settingsPopupStyle['display'] = "none";

        return (
            <div id="header">
                <div id="scidash-logo">
                </div>
                <div id="headerLinks">
                    <div className="row">
                        <div className="col-md-3 col-md-offset-4" style={this.props.buttonsStyle}>
                                <RaisedButton label="Tests View" primary={this.props.testsActive} onClick={this.props.openTestsPage} />
                                <RaisedButton label="Suites View" primary={this.props.suitesActive} onClick={this.props.openSuitesPage} />
                        </div>
                    </div>
                </div>
                <div id="headerSocialLinks" style={this.props.headerLinksStyle} ref={this.wrapSettingsRef}>
                    <RaisedButton onClick={this.props.toggleSettings} icon={<FontIcon className="fa fa-cog" style={{ padding: 5 }}/>} />
                    <Card style={this.props.settingsPopupStyle}>
                        <CardText>
                            <ColorMapToggleContainer />
                        </CardText>
                    </Card>
                </div>
            </div>
        )
    }
}
