import BaseAdapter from './BaseAdapter';

export default class ModelsGriddleAdapter extends BaseAdapter {

    getGriddleData(){

        let modelsData = [];

        for (let model of this.getRawData()){

            let options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZone: 'UTC',
                timeZoneName: 'short'
            };

            let fullDate = new Date(model.timestamp).toLocaleString('en-US', options);

            modelsData.push({
                name: model.model_class.class_name,
                class: model.model_class.class_name,
                tags: model.tags.map((item) => item.name),
                source: model.url,
                owner: "?",
                timestamp: fullDate
            });
        }

        if (modelsData.length == 0)
            modelsData = new InitialStateService()
                .getInitialStateTemplate()
                .models
                .data;

        return modelsData;

    }

}
