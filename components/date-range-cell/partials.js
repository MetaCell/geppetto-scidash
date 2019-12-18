import React from "react";


const ClearButton = ({ changed, clearFilter }) => {

    if (changed)
        return (
            <button id={"resetDate"} onClick={clearFilter}> Reset</button>
        )
    else
        return (
            <span></span>
        );

}

export {
    ClearButton,
}
