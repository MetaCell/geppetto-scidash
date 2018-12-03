import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';


const ColorMapToggle = ({colorBlind, toggleColorBlind}) => {
    return (
        <div id='controlsContainer'>
            <label>
                <Toggle
                    label="Color map"
                    onToggle={toggleColorBlind}
                    toggled={colorBlind}
                    labelPosition="right"
                    style={{margin: 2.5}}
                />
                <div
                    id='colorMapGradientLabel'
                    className={colorBlind ? 'colorBlindGradient':'defaultGradient'}>
                </div>
            </label>
        </div>
    );
}


export default ColorMapToggle;
