import React from 'react';
import Switch from '@material-ui/core/Switch';
import InitialStateService from "../../services/InitialStateService";
import UserApiService from "../../services/api/UserApiService";
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function ShowInstructionsToggle () {
  const userApiService = new UserApiService();
  const initialstate = InitialStateService.getInstance().initialState;
  const [state, setState] = React.useState({ show_instructions: initialstate.user.userObject.show_instructions });

  const handleChange = async event => {
    if (event) {
      const show = !state.show_instructions;
      await userApiService.setShowInstructions(show);
      setState({ ...state, show_instructions: show });
      initialstate.user.userObject.show_instructions = show;
    }
  };

  return (
    <div id='controlsContainer'>
      <FormControlLabel
        control={<Switch onChange={handleChange} checked={ state.show_instructions }/>}
        label="Show instructions"
        labelPlacement="start" />
    </div>
  )
}
