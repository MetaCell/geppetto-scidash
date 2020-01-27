import React from "react";


const ClearButton = ({ changed, clearFilter }) => {

  if (changed) {
    return (
      <button onClick={clearFilter}> Reset</button>
    )
  } else {
    return (
      <span></span>
    );
  }

}

export { ClearButton, }
