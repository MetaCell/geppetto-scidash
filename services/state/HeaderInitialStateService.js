
import BaseInitialStateService from "./BaseInitialStateService";
import PagesService from "../PagesService";

export default class HeaderInitialStateService extends BaseInitialStateService {

    initialStateTemplate = {
      testsActive: true,
      suitesActive: false,
      showSettings: false,
      colorBlind: false,
      drawerActive: false,
      activePage: new PagesService().getDefaultPage(),
      editModelActive: false,
      createModelActive: false
    }

}