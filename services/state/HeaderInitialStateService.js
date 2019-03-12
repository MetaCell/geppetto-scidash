
import BaseInitialStateService from "./BaseInitialStateService";
import PagesService from "../PagesService";

export default class HeaderInitialStateService extends BaseInitialStateService {

    initialStateTemplate = {
      showSettings: false,
      colorBlind: false,
      drawerActive: false,
      activePage: new PagesService().getDefaultPage()
    }


    generateInitialState (){
      let activePage = window.location.pathname;

      return {
        ...this.getInitialStateTemplate(),
        activePage
      };
    }

}
