import BaseInitialStateService from "./BaseInitialStateService";
import PagesService from "../PagesService";

export default class GlobalInitialStateService extends BaseInitialStateService {

  initialStateTemplate = {
    activeView: new PagesService().getDefault()
  }

}