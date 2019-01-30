import ApiService from "../services/api/ApiService";
import PagesService from "../services/PagesService";


export function toggleSettings (headerState, action){

  let newState = {
    ...headerState,
    showSettings: !headerState.showSettings
  };

  return newState;
}

export function hideSettings (headerState, action){

  let newState = {
    ...headerState,
    showSettings: false
  };

  return newState;
}

export function toggleColorBlind (headerState, action){

  let newState = {
    ...headerState,
    colorBlind: !headerState.colorBlind
  };

  return newState;
}

export function toggleDrawer (headerState, action){
  const { drawerActive, ...others } = headerState;

  return { ...others, drawerActive: !drawerActive };
}

export function changePage (headerState, action){
  return {
    ...headerState,
    activePage: action.page
  };
}

export function toggleCreateModel (headerState, action){
  return {
    ...headerState,
    createModelActive: !headerState.createModelActive
  };
}

export function toggleCreateTest (headerState, action){
  return {
    ...headerState,
    createTestActive: !headerState.createTestActive
  };
}
