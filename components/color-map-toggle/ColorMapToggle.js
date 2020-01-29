import React from 'react';
import Switch from '@material-ui/core/Switch';


const ColorMapToggle = ({ colorBlind, toggleColorBlind }) => (
  <div id='controlsContainer'>
    <label>
      <Switch
        label="Color map"
        onChange={toggleColorBlind}
        checked={colorBlind}
        labelPosition="right"
        style={{ margin: 2.5 }}
      />
      <div
        id='colorMapGradientLabel'
        className={colorBlind ? 'colorBlindGradient' : 'defaultGradient'}>
      </div>
    </label>
  </div>
)


export default ColorMapToggle;
