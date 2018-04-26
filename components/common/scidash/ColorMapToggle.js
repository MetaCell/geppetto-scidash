import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';

import GEPPETTO from 'geppetto'
import Scidash from '../../../common/Scidash';


export default class ColorMapToggle extends React.Component {

    constructor(props, context){
        super(props, context);

        this.state = {
            colorBlind: false
        }

        this.toggleColorBlind = this.toggleColorBlind.bind(this);
        this.reset = this.reset.bind(this);
    }

    toggleColorBlind(event){
        GEPPETTO.trigger(Scidash.COLOR_MAP_TOGGLED);
        this.setState({
            colorBlind: !this.state.colorBlind
        });
    }

    reset(){
        this.setState({
            colorBlind:false
        })
    }

    render(){
        return (
            <div id='controlsContainer'>
                <label>
                    <Toggle
                        label="Color map"
                        defaultToggled={false}
                        onToggle={this.toggleColorBlind}
                        toggled={this.state.colorBlind}
                        labelPosition="right"
                        style={{margin: 2.5}}
                    />
                    <div
                        id='colorMapGradientLabel'
                        className={this.state.colorBlind?'colorBlindGradient':'defaultGradient'}>
                    </div>
                </label>
            </div>
        )
    }

}
