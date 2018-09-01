export default function scidashGlobal(state = {}, action){
    console.group("SCIDASH GLOBAL REDUCER")

    if (action !== null)
        console.log("ACTION DISPATCHED: ", action)

    let newState = null;

    switch(action.type){
        default:
            newState = {
                ...state,
            };
            break;
    }

    console.log("Current state: ", newState);
    console.groupEnd()

    return newState;
}
