import { push } from "connected-react-router";

export const TOGGLE_SETTINGS = "TOGGLE_SETTINGS";

export const HIDE_SETTINGS = "HIDE_SETTINGS";
export const TOGGLE_DRAWER = "TOGGLE_DRAWER";
export const TOGGLE_COLOR_BLIND = "TOGGLE_COLOR_BLIND";
export const CHANGE_PAGE = "CHANGE_PAGE";
export const TOGGLE_CREATE_MODEL = "TOGGLE_EDIT_MODEL";
export const TOGGLE_CREATE_TEST = "TOGGLE_CREATE_TEST";


export function toggleSettings (){
  return {
    type: TOGGLE_SETTINGS
  };
}

export function toggleColorBlind (){
  return {
    type: TOGGLE_COLOR_BLIND
  };
}

export function hideSettings (){
  return {
    type: HIDE_SETTINGS
  };
}

export function toggleDrawer (){
  return {
    type: TOGGLE_DRAWER
  };
}

export function changePage (page, dispatch){
  dispatch(push(page));

  return {
    type: CHANGE_PAGE,
    page
  };
}
