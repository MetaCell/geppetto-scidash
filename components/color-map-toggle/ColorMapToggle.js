import React from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const ColorMapToggle = ({ colorBlind, toggleColorBlind }) => (
  <div id='controlsContainer'>
    <label>
      <FormControlLabel
        control={<Switch onChange={toggleColorBlind} checked={colorBlind}/>}
        label="Color map"
        labelPlacement="start"
      />
      <div
        id='colorMapGradientLabel'
        className={colorBlind ? 'colorBlindGradient' : 'defaultGradient'}>
      </div>
    </label>
  </div>
)


export default ColorMapToggle;
