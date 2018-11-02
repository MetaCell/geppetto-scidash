export default class Helper {

    constructor(){}

    isEmptyString(string){
        var isEmpty = false;

        if (string === null || string === undefined ||
            (string != undefined && string.length == 0)){
            isEmpty = true;
        }

        return isEmpty;
    }

    getBackground(sortKey, colorBlind){
        let sortKeyRounded = null;
        let percents = 0;
        let decreasingValue = 255;
        let growingValue = 255;

        if (typeof sortKey != "undefined" && !isNaN(sortKey)){
            sortKeyRounded = sortKey.toFixed(2);
            percents = sortKeyRounded * 100;
            decreasingValue = Math.floor(255 - (255 / 100 * percents));
            growingValue = Math.floor(255 / 100 * percents);

            if (!colorBlind){
                if (growingValue > 40)
                    growingValue = growingValue - 20;

                return "rgba("+ decreasingValue +", "+ growingValue +", 0, 1)"
            } else {
                if (decreasingValue > 40)
                    decreasingValue = decreasingValue - 20;

                return "rgba("+ decreasingValue +", "+ decreasingValue +", "+ growingValue +", 1)"
            }
        }

    }

    getOSIconClass(osName = null){

        switch(osName){
            case "OSX":
            case "Darwin":
                return "fa-apple";
            case "Linux":
                return "fa-linux";
            case "Windows":
                return "fa-windows";
            default:
                return "";
        }

    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    noneIfEmptyString(string = "") {
        return this.isEmptyString(string) ? "None" : string;
    }

    noneIfEmptyArray(array = []) {
        return array.length == 0 ? "None" : array;
    }

    noneIfEmptyObject(object = {}) {
        return Object.keys(object).length == 0 ? "None" : object;
    }

    noneIfEmptyMap(object = {}) {
        return object.size == 0 ? "None" : object;
    }

    queryStringToDict(queryString){
        let filters = new URLSearchParams(queryString);
        let parsedFilters = {};

        for (let filter of filters){
            if (/^timestamp_/.test(filter)){

                let date = new Date(filter[1]);

                if (Object.prototype.toString.call(date) === "[object Date]")
                    if (!isNaN(date.getTime()))
                        parsedFilters[filter[0]]= date.toISOString()
            } else {
                parsedFilters[filter[0]]=filter[1]
            }
        }

        return parsedFilters
    }

    parseBuildInfo(string){
        let buildInfoRegex = /(.+)(\/)(\w+)/;
        let buildInfoResult = null;
        let iconClass = "";

        if (buildInfoRegex.test(string)){
            buildInfoResult = buildInfoRegex.exec(string);
            iconClass = this.getOSIconClass(buildInfoResult[3]);
        }

        return {
            text: string,
            icon: iconClass
        };
    }

}

