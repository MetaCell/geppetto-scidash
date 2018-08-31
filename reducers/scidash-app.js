import scidashHeader from './scidash-header';


export default function scidashApp(state = {}, action){
    console.group("SCIDASH APP REDUCER")

    let newState = null;

    switch(action.type){
        default:
            newState = {
                ...state,
                header: scidashHeader(state.header, action)
            };
            break;
    }

    console.log("Current state: ", newState);
    console.groupEnd()

    return newState;
}

