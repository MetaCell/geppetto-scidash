import React from "react";
import Button from "@material-ui/core/Button";


const ClearButton = ({ changed, clearFilter }) => {

  if (changed) {
    return (
      <Button variant="contained" onClick={clearFilter} label="Reset">Reset</Button>
    )
  } else {
    return (
      <span></span>
    );
  }
}

export { ClearButton, }
