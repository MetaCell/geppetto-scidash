
export default function scidashApp(state = {}, action){
    console.group("SCIDASH APP REDUCER")
    console.log("Action dispatched: ", action)

    let newState = null;

    switch(action.type){
        default:
            newState = {
                ...state
            };
    }

    console.log("Current state: ", newState);
    console.groupEnd()

    return newState;
}

