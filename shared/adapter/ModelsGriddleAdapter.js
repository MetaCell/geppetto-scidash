import BaseAdapter from "./BaseAdapter";
import InitialStateService from "../../services/InitialStateService";

export default class ModelsGriddleAdapter extends BaseAdapter {

  getGriddleData (){

    let modelsData = [];

    for (let model of this.getRawData()){

      let options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZone: "UTC",
        timeZoneName: "short"
      };

      let fullDate = new Date(model.timestamp).toLocaleString("en-US", options);

      modelsData.push({
        id: model.id,
        scheduler_id: `${model.id}-model`,
        name: model.name,
        class: model.model_class.class_name,
        tags: model.tags.map(item => item.name),
        source: model.url,
        owner: model.owner.username,
        timestamp: fullDate,
        _timestamp: model.timestamp,
        block: {
          isBlocked: model.status == "l",
          modelId: model.id
        }
      });
    }

    if (modelsData.length == 0)
    {modelsData = new InitialStateService()
      .getInitialStateTemplate()
      .models
      .data;}

    return modelsData;

  }

}
