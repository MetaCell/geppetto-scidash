import ApiService from '../services/api/ApiService';

export function toggleSettings(headerState, action){

    let newState = {
        ...headerState,
        showSettings: !headerState.showSettings
    };

    return newState;
}

export function hideSettings(headerState, action){

    let newState = {
        ...headerState,
        showSettings: false
    };

    return newState;
}

export function toggleColorBlind(headerState, action){

    let newState = {
        ...headerState,
        colorBlind: !headerState.colorBlind
    };

    return newState;
}

export function toggleDrawer(headerState, action){
  const { drawerActive, ...others } = headerState;

  return { ...others, drawerActive: !drawerActive }
}