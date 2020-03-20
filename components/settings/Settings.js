import React from 'react';
import ColorMapToggle from '../color-map-toggle/ColorMapToggleContainer';
import ShowInstructionsToggle from '../show-instructions-toggle/ShowInstructionsToggle';

const ShowSettings = () => {
  const x = 1;
  return (
    <div>
      <ColorMapToggle/>
      <ShowInstructionsToggle/>
    </div>
  )
}

export default ShowSettings;