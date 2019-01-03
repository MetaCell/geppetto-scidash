export default function scidashTestInstances(state = {}, action){
    console.group("SCIDASH TEST INSTANCES REDUCER")

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
