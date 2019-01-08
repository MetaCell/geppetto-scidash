export default function scidashModels(state = {}, action){
    console.group("SCIDASH MODELS REDUCER")

    if (action !== null)
        console.log("ACTION DISPATCHED: ", action)

    let newState = null;

    newState = {
        ...state
    };

    console.log("Current state: ", newState);
    console.groupEnd()

    return newState
}

